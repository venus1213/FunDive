"use client"

import * as React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { contactApi } from "@/lib/api/contact"
import { useAuthStore } from "@/store/auth"

// このページ専用の問い合わせ種類を定義
const inquiryTypes = [
  { value: "mna", label: "M&A相談窓口" },
  { value: "consulting", label: "ビジネスコンサルティング窓口" },
  { value: "other", label: "その他" },
] as const

type InquiryType = typeof inquiryTypes[number]["value"]

const formSchema = z.object({
  name: z.string().min(2, "お名前は2文字以上で入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  type: z.enum(inquiryTypes.map((t) => t.value) as [InquiryType, ...InquiryType[]], {
    required_error: "問い合わせ種類を選択してください",
  }),
  message: z.string().min(10, "メッセージは10文字以上で入力してください"),
})

export default function ContactPage() {
  const { user } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.profile?.name || "",
      email: user?.email || "",
      message: "",
    },
  })

  // ユーザー情報が取得・変化した際にフォームへ反映
  useEffect(() => {
    if (user) {
      form.setValue("name", user.profile?.name || "")
      form.setValue("email", user.email || "")
    }
  }, [user, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)
      setSubmitStatus(null)

      await contactApi.submit(values)

      form.reset()
      setSubmitStatus({
        type: "success",
        message: "お問い合わせを受け付けました。内容を確認次第、ご連絡させていただきます。",
      })
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "送信に失敗しました。時間をおいて再度お試しください。",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto pt-24 pb-16 px-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">支援相談窓口</h1>
        <p className="text-muted-foreground">
          M&A相談・ビジネスコンサルティングに関する支援が必要な場合は、以下のフォームよりご連絡ください。
        </p>
      </div>

      {submitStatus && (
        <Alert
          variant={submitStatus.type === "success" ? "default" : "destructive"}
          className={`mb-6 ${submitStatus.type === 'success' ? 'border-green-600 bg-green-50 text-green-700' : ''}`}
        >
          {submitStatus.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-green-700" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription className={submitStatus.type === "success" ? 'text-green-700' : ''}>{submitStatus.message}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>お名前</FormLabel>
                <FormControl>
                  <Input placeholder="山田 太郎" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input placeholder="taro@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>問い合わせ種類</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="問い合わせ種類を選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {inquiryTypes.map((item) => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>お問い合わせ内容</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="お問い合わせ内容を入力してください"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  できるだけ具体的な内容をお書きください
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "送信中..." : "送信する"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

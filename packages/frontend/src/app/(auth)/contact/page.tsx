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
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { contactApi } from "@/lib/api/contact"

const formSchema = z.object({
  name: z.string().min(2, "お名前は2文字以上で入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  type: z.enum(["general", "service", "technical", "other"], {
    required_error: "問い合わせ種類を選択してください",
  }),
  message: z.string().min(10, "メッセージは10文字以上で入力してください"),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

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
        <h1 className="text-2xl font-bold mb-2">お問い合わせ</h1>
        <p className="text-muted-foreground">
          FUNDIVEに関するお問い合わせは、以下のフォームよりお願いいたします。
        </p>
      </div>

      {submitStatus && (
        <Alert
          variant={submitStatus.type === "success" ? "default" : "destructive"}
          className="mb-6"
        >
          {submitStatus.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription className={submitStatus.type === "success" ? "text-green-700" : ""}>{submitStatus.message}</AlertDescription>
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
                    <SelectItem value="general">一般的なお問い合わせ</SelectItem>
                    <SelectItem value="service">サービスについて</SelectItem>
                    <SelectItem value="technical">技術的な問題</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
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

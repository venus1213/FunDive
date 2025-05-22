"use client"

import * as React from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

const formSchema = z.object({
  displayName: z.string().min(2, '表示名は2文字以上で入力してください'),
  role: z.enum(['ENTREPRENEUR', 'INVESTOR'], {
    required_error: '役割を選択してください',
  }),
})

type InitialSetupProps = {
  onComplete: (values: z.infer<typeof formSchema>) => Promise<void>
}

export function InitialSetup({ onComplete }: InitialSetupProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: '',
      role: undefined,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      await onComplete(values)
      router.push('/dashboard')
    } catch (error) {
      console.error('初期設定エラー:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-lg mx-auto py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">アカウント設定</h1>
        <p className="text-muted-foreground">
          FUNDIVEをご利用いただくために、以下の情報を設定してください。
          これらの設定は後からプロフィール画面で変更することができます。
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>表示名</FormLabel>
                <FormControl>
                  <Input placeholder="表示名を入力" {...field} />
                </FormControl>
                <FormDescription>
                  他のユーザーに表示される名前です。実名でもニックネームでも構いません。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>役割</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="役割を選択してください" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ENTREPRENEUR">起業家（資金調達をしたい）</SelectItem>
                    <SelectItem value="INVESTOR">投資家（投資をしたい）</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  あなたの主な活動目的を選択してください。この設定は後から変更することもできます。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-sm text-muted-foreground text-center">
            <p>
              設定を完了することで、
              <Link href="/terms" className="text-primary hover:underline">利用規約</Link>
              と
              <Link href="/privacy" className="text-primary hover:underline">プライバシーポリシー</Link>
              に同意したものとみなされます。
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '設定中...' : '設定を完了してはじめる'}
          </Button>
        </form>
      </Form>
    </div>
  )
} 
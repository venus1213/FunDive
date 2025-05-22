"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { loginWithGoogle } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"

type GoogleAuthButtonProps = {
  mode: 'login' | 'register'
  onClick?: () => Promise<void>
  disabled?: boolean
}

export function GoogleAuthButton({ mode, onClick, disabled }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true)
      const result = await loginWithGoogle()
      
      if (result.isNewUser) {
        // 必須パラメータのチェック
        if (!result.email || !result.firebaseUid || !result.idToken) {
          throw new Error('必要な認証情報が不足しています')
        }

        // クエリパラメータの構築
        const params = new URLSearchParams()
        params.set('email', result.email)
        params.set('name', result.name || '')
        params.set('firebaseUid', result.firebaseUid)
        params.set('idToken', result.idToken)

        router.push(`/register/google?${params.toString()}`)
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Google認証エラー:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const text = mode === 'login' ? 'Googleでログイン' : 'Googleで登録'

  return (
    <Button 
      variant="outline" 
      type="button" 
      className="w-full" 
      onClick={onClick || handleGoogleAuth}
      disabled={isLoading || disabled}
    >
      <FcGoogle className="mr-2 h-4 w-4" />
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          {text}
        </div>
      ) : (
        text
      )}
    </Button>
  )
}

// 後方互換性のために残す
export function GoogleSignInButton() {
  return <GoogleAuthButton mode="login" />
} 
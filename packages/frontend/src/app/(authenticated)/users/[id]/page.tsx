import { ProfileDetail } from "@/components/features/profile/ProfileDetail";

interface Props {
  params: Promise<{ id: string }> | { id: string };
}

export default async function UserProfilePage({ params }: Props) {
  const id = (await params).id;
  return <ProfileDetail userId={id} />;
} 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  name: string
  avatarUrl?: string | null
  className?: string
}

export function UserAvatar({ name, avatarUrl, className }: UserAvatarProps) {
  // Generate initials from name
  const getInitials = (name: string) => {
    if (!name) return "U"
    
    const parts = name.split(" ")
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase()
    }
    
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase()
  }

  return (
    <Avatar className={className}>
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} alt={name} />
      ) : null}
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  )
} 
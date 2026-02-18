import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface AdminDataDialogProps {
    email: string;
    password: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AdminDataDialog({ email, password, isOpen, onOpenChange }: AdminDataDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={true} className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Admin Data</DialogTitle>
          <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              defaultValue={email}
            />
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              defaultValue={password}
              readOnly
            />
          </div>
        </div>
        <Button variant="outline" className="w-full gap-2 border-border bg-card text-foreground hover:bg-muted hover:text-emerald-700 cursor-pointer mt-4"
        onClick={() => {
          navigator.clipboard.writeText(`Email: ${email}\nPassword: ${password}`)
          onOpenChange(false)
        }}
        >
          Copiar Credenciais
        </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

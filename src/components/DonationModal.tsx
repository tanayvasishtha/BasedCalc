import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export const DonationModal = ({ isOpen, onClose, amount }: DonationModalProps) => {
  const { theme } = useTheme();
  
  const handleDonate = () => {
    // Format amount to 2 decimal places
    const formattedAmount = amount.toFixed(2);
    
    // Redirect to Stripe payment (replace with your Stripe link)
    const stripeUrl = `https://donate.stripe.com/test?amount=${Math.round(amount * 100)}`;
    window.open(stripeUrl, '_blank');
    onClose();
  };

  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`modal-slide-up max-w-md ${theme === 'glassmorphism' ? 'glass' : ''}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Heart className="w-6 h-6 text-destructive fill-current" />
            Donation Receipt
          </DialogTitle>
          <DialogDescription>
            Your calculation result is ready to help animals in need!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Receipt Details */}
          <div className={`p-6 rounded-lg bg-muted/50 border-2 border-dashed border-border space-y-4 ${theme === 'terminal' ? 'font-mono' : ''}`}>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Donation Amount:</span>
              <span className="text-3xl font-bold text-primary">
                ${amount.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">{formattedTime}, {formattedDate}</span>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground mb-2">Beneficiary:</div>
              <div className="font-semibold">Animal Welfare Fund</div>
            </div>
          </div>

          {/* Message */}
          <div className={`p-4 rounded-lg bg-primary/10 border border-primary/20 ${theme === 'cute-animals' ? 'text-center' : ''}`}>
            <p className="text-sm leading-relaxed">
              {theme === 'cute-animals' ? '🐾 ' : ''}
              <strong>Help us save animals!</strong> Your donation provides food, shelter, 
              and medical care for rescued animals. Every dollar makes a difference in their lives.
              {theme === 'cute-animals' ? ' 🐾' : ''}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleDonate}
              className="flex-1 h-12 text-lg button-press"
              size="lg"
            >
              <Heart className="w-5 h-5 mr-2" />
              Donate ${amount.toFixed(2)}
            </Button>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="h-12 button-press"
              size="lg"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center">
            No payment information is stored. Donations are processed securely through Stripe.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

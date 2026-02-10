import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { PortfolioSample } from '@/config/portfolioSamples';

interface PortfolioDetailDialogProps {
  sample: PortfolioSample | null;
  onClose: () => void;
}

export default function PortfolioDetailDialog({ sample, onClose }: PortfolioDetailDialogProps) {
  if (!sample) return null;

  return (
    <Dialog open={!!sample} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-chart-1/40 text-chart-1">
              {sample.category}
            </Badge>
          </div>
          <DialogTitle className="text-2xl">{sample.title}</DialogTitle>
          <DialogDescription>{sample.description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <img src={sample.imageUrl} alt={sample.title} className="w-full rounded-lg border border-border/40" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Vendor CTA */}
        <div className="bg-gradient-to-br from-primary/15 to-secondary/15 rounded-2xl p-8 border border-primary/20 space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Ready to Sell?</h3>
          <p className="text-muted-foreground">
            Join thousands of independent creators earning on Wakawears. 10% commission, 0% hassle.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
            Become a Vendor <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-br from-accent/15 to-secondary/15 rounded-2xl p-8 border border-accent/20 space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Stay Updated</h3>
          <p className="text-muted-foreground">
            Get exclusive access to new collections, flash deals, and vendor spotlights.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

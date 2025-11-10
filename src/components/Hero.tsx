export function Hero() {
  return (
    <section className="container px-6 lg:px-12 py-16 lg:py-24">
      <div className="max-w-4xl">
        <div className="flex items-start gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-muted overflow-hidden flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Your Name
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Senior Product Designer/Product Engineer based in San Francisco Bay Area
        </p>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl">
          I'm a Product Designer based in the San Francisco Bay Area with over 7 years of experience. 
          I thrive in ambiguous, emerging tech space and specialize in 0–1, end-to-end mobile & Web 
          projects. Leading them with clarity, craft, and confidence.
        </p>
        
        <div className="flex items-center gap-8 mb-12 flex-wrap">
          <div className="h-8 opacity-60 hover:opacity-100 transition-opacity">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Citi.svg/200px-Citi.svg.png" 
              alt="Citi" 
              className="h-full w-auto grayscale hover:grayscale-0 transition-all"
            />
          </div>
          <div className="h-8 opacity-60 hover:opacity-100 transition-opacity">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/JPMorgan_Chase_Logo_2008.svg/200px-JPMorgan_Chase_Logo_2008.svg.png" 
              alt="JPMorgan Chase" 
              className="h-full w-auto grayscale hover:grayscale-0 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

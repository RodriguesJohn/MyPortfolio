import speakingThumbnail from "@/assets/Speaking 1.png";
import speakingThumbnail2 from "@/assets/Speaking2.png";
import speakingThumbnail3 from "@/assets/Speaking3.jpg";

export function Speaking() {
  const speakingEvents = [
    {
      id: 1,
      title: "Out of Scope 2025",
      date: "March 15",
      year: "2024",
      location: "San Francisco, CA",
      thumbnail: speakingThumbnail,
      description: "\"Out of Scope\" is an event that features a candid design panel—created to spark real, unfiltered conversations about the state of the industry",
    },
    {
      id: 2,
      title: "Impact of AI on Product and UX Designers' Role and Workflows",
      date: "June 22",
      year: "2024",
      location: "Orange County",
      thumbnail: speakingThumbnail2,
    },
    {
      id: 3,
      title: "Prototyping AI Apps",
      date: "September 8",
      year: "2023",
      location: "Palo Alto",
      thumbnail: speakingThumbnail3,
    },
  ];

  return (
    <section className="py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-medium mb-12 opacity-60">Speaking</h2>
        <div className="flex flex-col gap-8">
          {speakingEvents.map((event) => (
            <div
              key={event.id}
              className="border-b border-border/50 pb-8 last:border-b-0 flex gap-6"
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium mb-3 text-foreground opacity-60">
                  {event.title}
                </h3>
                {event.description && (
                  <p className="text-base text-muted-foreground/70 mb-3 leading-relaxed">
                    {event.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 text-muted-foreground opacity-60">
                  <span>{event.year}</span>
                  <span>•</span>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


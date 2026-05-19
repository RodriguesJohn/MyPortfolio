# Outfix.ai
## Designing an AI Personal Stylist from a Blank Page

**Role:** UX & Product Design, Frontend Development  
**Timeline:** December 2024 — Ongoing  
**Platform:** React Native, iOS  
**Collaborator:** Joshua Chung, Founder & ML Engineer  

---

## How This Started

I won a hackathon in San Francisco. The event was run by OpenAI, AGI Inc., and Lovable. I was presenting UX Agent, an AI-native design tool I had built for the competition.

After the presentations, a guy came up to me. His name was Joshua Chung. Berkeley CS, ML engineer. He said he was working on something and needed a designer. Not to execute a vision he already had. He needed someone to help him figure out what the vision was.

We got on a call two weeks later. He said something that I wrote down immediately.

*"I just want to make sure that bad dressers never dress badly again."*

That sentence became the brief. Everything else we had to figure out together.

---

## What Joshua Had Built

Joshua had spent months building a clothing segmentation and recommendation system. The ML model could extract individual clothing items from a photo of a person. It could analyse colour harmonies, pattern matching, and outfit compatibility. He had trained it on Amazon product images. He was still rebuilding the recommendation backend because the results weren't good enough yet.

What he didn't have was an interface. He didn't have a product. He didn't have clarity on who the user was. He had intelligence with nowhere to live.

His early users had already given him feedback. The onboarding was too long. Nobody wanted to lay their clothes out on the floor to photograph them. The experience asked for too much before giving anything back.

He came to me with the ML model working and everything else open.

---

## The User Nobody Was Designing For

The first thing I pushed Joshua on was the user. Every fashion app in the market targets people who already care about fashion. Whering, the dominant player, is built for people who genuinely enjoy styling themselves. It's a tool for enthusiasts.

Joshua didn't want to build for enthusiasts. He kept coming back to his dad. A 50-something who gets dressed every morning not knowing if his colours match. Someone whose wife tells him he's wearing the wrong thing. Someone who doesn't want to learn about fashion. They just want to not dress badly.

That person is everywhere. Busy professionals. Engineers. Anyone who views getting dressed as cognitive overhead rather than creative expression. They wake up, open their wardrobe, and feel a low-level dread.

No app was solving that. Most apps made it worse by asking them to engage with fashion on fashion's terms.

Once we named that user, everything else followed.

---

## The First Hard Decision: What Kind of App Is This?

Before I drew a single screen, Joshua and I had to decide what the interaction model was. He had been thinking about the app as a recommendation engine — take a photo, swipe through suggestions. I pushed back. That felt like every other app.

I asked him: what does it feel like when you talk to a stylist? He said it's a conversation. You describe your life, your plans, what you're going for. They respond. They know you over time.

He mentioned an anime he liked, Psycho-Pass, where a character just speaks to a system that dresses them. No buttons. No menus. Just talking.

That image clicked for both of us. The interaction model wasn't a feed or a swiping interface. It was a conversation with a stylist. The AI spoke. The user spoke back. The visual recommendations appeared as part of that conversation, not instead of it.

Voice became the primary input. That decision shaped everything that came after.

---

## The Hardest UX Problem: 40 Seconds

The segmentation model took about 40 seconds to process a photo. Industry research puts average app abandonment at around 3 seconds of waiting. We had a 37-second problem.

Joshua asked me in the January 7 meeting: how do we handle this?

My first instinct was to find ways to shorten the perceived time. Progress bars. Skeleton screens. Background processing. Standard answers.

But then I thought about what was actually happening. The model wasn't idle for 40 seconds. It was doing something extraordinary — extracting every piece of clothing from a photo, analysing colours, building a dataset that would power personal recommendations. The work was real. The problem was that none of that was visible to the user.

I said something during that meeting that became the foundation of the whole loading experience: "I like the word anticipation. The stylist is curating things for you."

The shift was subtle but complete. Instead of a progress bar that makes you watch time pass, the orb would animate with purpose. Copy would appear: "Your stylist is curating clothes for you." The user wasn't waiting. They were being attended to.

The same 40 seconds. A completely different emotional experience.

This is the kind of design decision that doesn't show up as a pretty screen in a portfolio. It's a reframe. The ML constraint became the product's warmth.

---

## The Orb

Every product has a moment where its identity clicks. For Outfix, it was the orb.

I had been exploring what the agent's visual presence should look like. I went through humanoid faces (too literal, uncanny), clothing icons (too functional, no warmth), abstract geometric shapes (too cold). None of them felt like a stylist.

A stylist has presence. They're warm. They're alive. They respond to you.

I landed on a gradient sphere — warm orange to deep amber, with a soft inner glow. When rendered in 3D with the right motion, it felt alive. It felt like something was inside it, thinking.

But the orb wasn't just brand identity. I designed it to carry functional information without words.

Five states, five colours:

Grey meant the app was open but not engaged. Blue meant it was listening. Orange meant it was processing, the ML model working. Green meant it was responding. Gold meant it was in rating mode, scoring your outfit.

Colour became the API. Users learned to read the orb without being taught. The brand and the system status were unified into one thing.

Joshua saw it in the January 7 meeting and said: "I can never do this. It looks so good."

That reaction told me we had something.

---

## Designing for an Agent That Controls Its Own Output

The January 16 meeting was the longest and most important. 107 minutes. We were trying to solve a problem I hadn't encountered in quite this form before.

An AI agent doesn't have a fixed UI. It decides what to show, when to speak, what to recommend. How do you design a screen for a system whose outputs are dynamic and unpredictable?

Joshua had been struggling with this on the backend. He said the agentic structure made backend development much more complex because user interactions directly impacted the agent's decision-making. Every interface decision he made changed how the agent behaved.

We considered three directions.

A chat-first UI felt familiar, but fashion is visual. Text bubbles can't show outfit pairings at a glance. The most important output — what to wear — would get buried in conversation.

A card feed felt more visual, but it was passive. No sense of a stylist guiding you. It would feel like Instagram, not a personal advisor. The agent would disappear entirely.

What we landed on was an integrated canvas. The orb floated above the tab bar, always present, never a tab. Below it, the screen split into two zones. The top half was always visual: outfit recommendations, ratings, wardrobe gaps. The bottom half was always conversational: the agent's voice rendered as text, with the ability to type back.

The agent determined what filled those zones. I determined their boundaries.

That became the design principle for agentic interfaces: you don't design the content. You design the stage.

---

## The Cold Start Problem

There was a business problem hiding inside a UX problem.

The recommendation model needed wardrobe data to give good recommendations. No data meant generic suggestions. Generic suggestions meant users wouldn't come back. Users not coming back meant no data. A perfect loop in the wrong direction.

The obvious solution was to ask users to upload their clothes. But that's a chore. Nobody wants to photograph their wardrobe before seeing any value from the app. We'd already heard this from early users.

I needed a way to make data collection feel like something users wanted to do, not something we were asking them to do for us.

Two things came together.

First, I noticed that people take mirror selfies constantly on social media. Not to document their wardrobe. To get validation. "How do I look?" is a question people are already asking publicly. I designed the first action in the app around that instinct. Take a selfie. Get feedback. The psychological reward comes before the data collection.

Second, I designed the wardrobe unlock as a progress mechanic. "Upload 5 photos to unlock your personal wardrobe." The user thinks they're earning a feature. The AI is building its training dataset. Same behaviour. Opposite emotional frame.

The agent then became the one who asked for more. Not the UI. The agent would say: "I can give you better recommendations if you add more items." It felt like guidance, not extraction.

Three separate mechanisms. All pointing to the same outcome: a continuously growing dataset dressed up as a product experience.

---

## Copy as a Design Material

I spent more time on copy in this project than on almost any visual decision. Every word in the onboarding was a design decision.

The ML model needed full-body photos to work. Photos where the face was covered or the clothing was cropped wouldn't segment properly. The model would fail silently and produce bad recommendations.

The original copy was "Capture Selfie or Upload Pictures." It gave users no mental model. They'd upload whatever felt natural, the model would struggle, and they'd blame the app.

I changed it to "Upload a Full-Body Photo, preferably a mirror selfie that doesn't cover your face." Specific. Instructional. It encodes the ML requirement into the user experience without mentioning ML at all. The app felt more thoughtful. The model got cleaner inputs.

I added an illustrated guide showing a correct photo versus an incorrect one. Good selfie, bad selfie. Users understood immediately. The constraint became a feature.

Authentication was another copy decision. Joshua wanted to try anonymous authentication — no login, users just start. I argued against it. For an app asking people to upload photos of themselves, the moment they wonder "is this private" is the moment you lose them. Apple Sign-In as default solved it. Apple's privacy brand borrows trust that the app hasn't earned yet. One tap. No form. No anxiety.

"Get started with your wardrobe" became "Your Personal AI Stylist." Nobody wants to manage a wardrobe. They want to dress better. The headline leads with the outcome, earns the action after.

---

## The Tools I Used

I designed and built this the way I build everything now — AI tools throughout, not at the end.

I connected Cursor to Figma via MCP protocol during the project. I had set it up right before the January 27 call, so excited about it that I mentioned it to Joshua before he'd even finished joining. What would have taken hours of manual token and variable work in Figma I was able to automate. The design system came together much faster.

I used React Native alongside Joshua to build animation states and component interactions. Cursor handled the code generation while I focused on the motion behaviour. We shipped orb animations, tab bar interactions, and loading states together.

For the onboarding illustration — the mirror selfie guide — I generated the 3D reference image with Runway Gen-4. It communicated exactly what a good photo looked like without a photo shoot.

I prototyped the clothing recognition UX in Google AI Studio with Gemini before any backend integration. I needed to understand how the AI would actually behave, not how I imagined it would behave. Testing against real model output changed several interface decisions.

For the current rebuild, I'm using a Figma to Claude Code pipeline I developed for this project. Design in Figma, generate in Claude Code, ship. The feedback loop is tight enough that I can test a decision in production the same day I made it in the design file.

---

## What Happened to the Product

The initial sprint ended. Joshua built the implementation. And then something we didn't expect: adoption stalled.

The design looked right. The implementation didn't match it. The development had introduced a gap between what we had designed and what users were actually experiencing. The homepage hierarchy was broken. The onboarding had lost the delight it needed. Joshua described it as wanting "magical moments" and not seeing them.

I could have written a feedback document. Instead I asked Joshua three questions: what's your goal right now, what are you actually struggling with, why do you think users aren't staying.

The answers pointed somewhere unexpected. It wasn't a design problem and it wasn't a code problem. The consumer app was competing against ChatGPT for fashion questions and losing. The stronger play was sitting underneath the surface: the ML recommendation model itself. That was what was genuinely proprietary. That was what fashion brands and styling agencies would pay for.

Joshua hadn't seen it clearly until we talked it through. I helped him reframe the whole business from B2C to B2B. Outfix wouldn't be an app for individual users. It would be a platform for professional stylists and agencies, with the consumer app returning later.

He said something after that conversation that I've thought about since: "This is what good designers do. They don't just design the product. They shape the business. You entirely changed my whole business."

I'm now rebuilding the consumer app using the Figma to Claude Code workflow. Before and after. What it was, what it should have been, and what it's becoming. That's the part of the story that's still being written.

---

## The Design Decisions That Actually Mattered

Looking back across the whole project, the decisions that had the most impact weren't the visual ones.

The anticipation loading reframe was more valuable than any screen I designed. It turned a technical limitation into a brand moment. Users feel attended to instead of stuck. That's a retention decision disguised as a loading state.

The orb's colour-coded states meant the agent's internal activity was always legible. Users didn't need a tutorial. The system communicated itself. That's trust built without asking for it.

The integrated canvas gave the agent room to be agentic without the UI becoming unpredictable. Defining the stage instead of the content was the principle that made the whole interaction model coherent.

The cold start mechanics turned a data problem into a product loop. Users built the dataset that made their own recommendations better. The flywheel ran on delight, not obligation.

And the B2B pivot, which wasn't a design decision at all in the traditional sense, turned out to be the most important contribution I made. Good design isn't always about the screen.

---

## What I Learned

I've designed consumer apps before. I've designed AI products before. This project was different because the intelligence was the product, not a feature of the product.

When the AI is the core, the interface isn't a layer on top of functionality. It's a relationship with something that has agency. The orb thinks. It decides. It speaks. Designing for that requires thinking differently about what a screen is for.

A screen in this context isn't a surface for displaying information. It's a container for a relationship. The design decisions are about making that relationship feel trustworthy, warm, and human — even when the technical reality underneath is 40-second segmentation pipelines and transformer embeddings.

The best moment in the project was when Joshua said during our January 7 call: "People really underestimate how important UI/UX is. You have to reflect that through your backend as well."

He said that unprompted. He'd arrived at it through building. That's when I knew the collaboration was working the way it was supposed to.

---

*Outfix.ai is currently in development. The rebuild is ongoing.*  
*Joshua Chung is based in Sunnyvale, CA, pursuing seed funding.*  
*NDA signed February 25, 2025.*
"Stream Avatars... Why is it paid?", - someone asked me a while ago and I wrote KimiAvatars project :D

This one is private, because customer decided to paid me in the end (why don't just buy a Stream Avatars if you had cash bro).

KimiAvatars is the overlay software for Twitch streamers to display viewers' avatars during broadcasts. It has an avatar wardrobe viewers can "buy" using Twitch channel points system. Broadcaster creates some reward with a price, then links it's ID with a KimiAvatars and magic happens. Whenever some viewer buy a reward using channel points, specified avatar dresses up! 

The cool stuff about my overlay, that when avatar look changes, overlay plays a completely unique animation, taking attention of everyone. For example, KimiAvatars has Vergil's outfit from DMC series, so swapping to this outfit, avatar cuts the screen with a judgement cut similar to DMC V effect. Exactly the same, yes. B)

What about dev-stack I worked with, well... I used Godot with C# support + TwitchLib as SDK for Twitch written in C#. 

Why Godot? It has capabilities to render multiple windows with custom properties, such as transparent background. For main avatars overlay window this was a killer-feature, since OBS can handle transparent windows too. Thus, a customer was satisfied, me was satisfied as well.

Will I recommend to use Godot for similar project in 2025...? Idk. This engine is decent, but it can't operate with GPU memory even today, so probably it will be better to work with something like Defold instead. Just for note: an empty scene in Godot reserves 60% of my GPU holy moly I will never use Godot once ever again.

P.S. I'm still interested in similar project for open-source, so maybe I'll re-write it someday.
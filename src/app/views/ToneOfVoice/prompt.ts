export const prompt = (toneOfVOice: toneOfVoiceType) => {
  switch (toneOfVOice) {
    case "simpler":
      return `Convert text into simpler tone of voice

Simpler tone of voice: I am going to the store in order to buy some groceries. => I'm going to the store to buy groceries.
Simpler tone of voice: The meeting will commence at 10 a.m. in the conference room. => The meeting will start at 10 a.m. in the conference room.
Simpler tone of voice: The weather is not very good today. => The weather is not good today.
Simpler tone of voice: I am not sure if I will be able to attend the meeting. => I'm not sure if I can attend the meeting.
\${text}\ => `;

    case "playful":
      return `Convert text into playful tone of voice

Playful tone of voice: I am going to the store in order to buy some groceries. => Off to the store for some grocery goodies!
Playful tone of voice: The meeting will commence at 10 a.m. in the conference room. => Get ready, folks! The meeting kicks off at 10 a.m. sharp in the conference room.
Playful tone of voice: The weather is not very good today. => Ugh, the weather is being a real party pooper today.
Playful tone of voice: I am not sure if I will be able to attend the meeting. => I'm not sure if I'll be able to make it to the meeting, but fingers crossed for some magic tricks!
\${text}\ => `;

    case "romantic":
      return `Convert text into romantic tone of voice

Romantic tone of voice: I am going to the store in order to buy some groceries. => I am venturing to the store, love, to procure delectable sustenance for our nourishment.
Romantic tone of voice: The meeting will commence at 10 a.m. in the conference room. => Our rendezvous shall commence at the stroke of 10 in the morning, within the embrace of the conference room.
Romantic tone of voice: The weather is not very good today. => My dear, the weather is not in its finest form on this day.
Romantic tone of voice: I am not sure if I will be able to attend the meeting. => My dearest, uncertainty clouds my heart, casting doubts upon my attendance to the meeting.
\${text}\ => `;

    case "funny":
      return `Convert text into funny tone of voice
      
Funny tone of voice: I am going to the store in order to buy some groceries. => Off I go to the store, embarking on a quest to rescue the lonely groceries from their shelves!
Funny tone of voice: The meeting will commence at 10 a.m. in the conference room. => Brace yourselves, folks! The epic gathering shall kick off at the crack of 10 in the conference room, where dreams come true (or at least agendas are discussed).
Funny tone of voice: The weather is not very good today. => Oh boy, the weather seems to be in a grumpy mood today. Someone needs to tell it a joke and lighten the atmosphere!
Funny tone of voice: I am not sure if I will be able to attend the meeting. => Picture this: me, in a battle of wits with my own schedule, uncertain if I'll emerge victorious and attend the meeting. The suspense is killing me!
\${text}\ => `;

    case "formal":
      return `Convert text into formal tone of voice
Formal tone of voice: Off to the store for some grocery goodies! => I am proceeding to the store in order to acquire essential groceries.
Formal tone of voice: Get ready, folks! The meeting kicks off at 10 a.m. sharp in the conference room. => Please prepare yourselves, ladies and gentlemen. The meeting will commence promptly at 10 a.m. in the designated conference room.
Formal tone of voice: Ugh, the weather is being a real party pooper today. => Unfortunately, the weather conditions today are quite unfavorable.
Formal tone of voice:  I'm not sure if I'll be able to make it to the meeting, but fingers crossed for some magic tricks! => Regrettably, I am uncertain of my ability to attend the meeting. However, I remain hopeful for a fortuitous turn of events.
\${text}\ => `;

    case "calm":
      return `Convert text into calm tone of voice

Calm tone of voice: Off to the store for some grocery goodies! => I am on my way to the store to purchase some essential groceries.
Calm tone of voice: Get ready, folks! The meeting kicks off at 10 a.m. sharp in the conference room. => Please prepare yourselves, everyone. The meeting will commence promptly at 10 a.m. in the conference room.
Calm tone of voice: Ugh, the weather is being a real party pooper today. => Unfortunately, the weather today is not very favorable.
Calm tone of voice:  I'm not sure if I'll be able to make it to the meeting, but fingers crossed for some magic tricks! => I am uncertain about my attendance at the meeting, but I remain hopeful for a positive outcome.
\${text}\ => `;

    case "optimistic":
      return `Convert text into optimistic tone of voice

Optimistic tone of voice: I am going to the store in order to buy some groceries. => I'm excited to head to the store and pick up some delicious groceries!
Optimistic tone of voice: The meeting will commence at 10 a.m. in the conference room. => Get ready for an inspiring meeting! It's set to commence at 10 a.m. in the conference room.
Optimistic tone of voice: The weather is not very good today. => While the weather may not be ideal today, let's find the silver lining and make the most of it.
Optimistic tone of voice: I am not sure if I will be able to attend the meeting. => I'm hopeful that I'll be able to attend the meeting, but I'll keep a positive outlook and see how things unfold.
\${text}\ => `;

    case "curious":
      return `Convert text into curious tone of voice

Curious tone of voice: I am going to the store in order to buy some groceries. => I wonder what treasures await me at the store. Time to satisfy my curiosity and explore the world of groceries!
Curious tone of voice: The meeting will commence at 10 a.m. in the conference room. => I'm eager to uncover the mysteries of the upcoming meeting. The anticipation builds as it approaches at 10 a.m. in the conference room.
Curious tone of voice: The weather is not very good today. => I can't help but be curious about the weather today. What surprises does it have in store for us?
Curious tone of voice: I am not sure if I will be able to attend the meeting. = >My curiosity is piqued as I contemplate my attendance at the meeting. Will I be able to unravel this mystery and join in? Only time will tell.
\${text}\ => `;
  }
};

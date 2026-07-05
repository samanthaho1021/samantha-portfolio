const aChanceInLife = {
  slug: 'a-chance-in-life',
  accent: '#1D4ED8',
  accentLight: '#E8F0FE',
  title: "Run to Donate: a fitness challenge app for A Chance in Life",
  subtitle: 'Nearly 78% of visitors dropped off before even starting a donation. Rather than redesign the donation page the client blamed, I traced the real gap to engagement and pitched a run-to-donate campaign that lets people give by moving, not paying.',
  tags: ['Mobile App', 'UX Research', 'NGO'],
  heroImage: 'hero.jpg',
  meta: [
    { label: 'Client', value: 'A Chance in Life' },
    { label: 'Role', value: 'UX Researcher & Designer' },
    { label: 'Industry', value: 'NGO' },
    { label: 'Timeline', value: 'May–Jul 2025' },
  ],
  sections: [
    { id: 'context', label: 'Context' },
    { id: 'problem', label: 'Problem' },
    { id: 'brainstorm', label: 'Brainstorm' },
    { id: 'campaign', label: 'Run to Donate' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'donations', label: 'Donations' },
    { id: 'testing', label: 'Testing' },
    { id: 'pitch', label: 'Pitch' },
    { id: 'next', label: 'Next Steps' },
    { id: 'impact', label: 'Impact' },
  ],
  beats: [
    {
      id: 'context',
      label: '01 · Context',
      heading: 'An NGO trying to lift its donation rate',
      blocks: [
        { p: 'A Chance in Life is an NGO that supports at-risk youth globally through educational programs and resources. It promotes self-reliance and community support, helping young people reach their potential and lead successful lives.' },
      ],
    },
    {
      id: 'problem',
      label: '02 · Problem',
      heading: 'Top-of-funnel drop-off was far above the industry average.',
      blocks: [
        { p: "I was hired to help increase the website's donation rate. In the conversion funnel, nearly 78% of visitors dropped off before even initiating a donation, well above the industry average of 60%. The client assumed the donation page itself was the cause. I suspected it was something earlier." },
        { list: [
          'Potential donors are far more likely to give when they feel a strong connection to the cause and see the impact of their contribution.',
          'My hypothesis: the lack of community engagement, not the donation page, was the primary reason for the high drop-off.',
          'Fostering a sense of community through interactive campaigns and storytelling could reduce that drop-off.',
        ] },
        { img: 'problem.jpg', cap: 'The conversion funnel: Interest and Involvement were the two stages driving the drop-off.' },
      ],
    },
    {
      id: 'brainstorm',
      label: '03 · Brainstorm',
      heading: "I explored two other ideas before landing on 'Run to Donate'.",
      blocks: [
        { list: [
          'Live donation updates, so users see the immediate impact of their contribution through live charts and graphs.',
          'Quests that involve different actions, such as small donations, sharing campaigns, attending virtual events, or volunteering.',
        ] },
        { p: "Both still lacked long-term engagement. It wasn't clear users would keep coming back, and competitors had already done similar things, so neither would help the client stand out." },
        { img: 'quests.jpg', cap: 'A quests dashboard with charity activities and personal rankings.' },
        { img: 'live.jpg', cap: 'A dashboard showing live donation updates.' },
      ],
    },
    {
      id: 'campaign',
      label: '04 · Run to Donate',
      heading: "I pitched the 'Run to Donate' campaign, so people could give without spending their own money.",
      blocks: [
        { p: 'Run to Donate lets users raise money by running, with no personal financial contribution required. From user interviews, I found many young donors avoid giving because they lack financial stability. This campaign:' },
        { list: [
          'Removes that barrier by letting them support a cause through physical activity instead of money.',
          'Promotes the benefit of improving their physical health while contributing to a good cause.',
        ] },
        { video: 'run.mp4', max: '300px', cap: 'Users track their steps and pace to accumulate contributions.' },
      ],
    },
    {
      id: 'engagement',
      label: '05 · Engagement',
      heading: 'The app engages better when it is a little competitive.',
      blocks: [
        { p: "Without a sense of competition, it's hard to get users to return. So I added a leaderboard on the 'My Activity' page. Now users can:" },
        { list: [
          "See other users' achievements and stay motivated to use the app.",
          'Encourage more people to join the campaign and build community.',
          'Strive to reach the leaderboard for a sense of accomplishment.',
        ] },
        { video: 'leaderboard.mp4', max: '300px', cap: 'Users open the tab menu to see the leaderboard.' },
        { sub: 'Inviting friends to run together' },
        { p: 'After pitching the concept, I noticed coworkers wanted to invite friends to run together for motivation. So on the home page, users can invite friends to a run. The more people who join, the more likely users are to commit over the long term.' },
        { list: [
          'This encourages ongoing engagement and makes the experience more enjoyable.',
          'Invitations lift participation even when users are not feeling motivated to work out.',
        ] },
        { video: 'invite.mp4', max: '300px', cap: "Users switch between 'My Activities' and 'Leaderboard'." },
      ],
    },
    {
      id: 'donations',
      label: '06 · Donations',
      heading: 'After a run, users choose which program receives their earnings.',
      blocks: [
        { p: 'From user interviews, I found people are more likely to donate when the program aligns with their interests. So after a run, users pick which program to donate their earnings to.' },
        { list: [
          'This personalization encourages participation and increases the likelihood of donating.',
          'It builds credibility by showing exactly where the money goes, rather than donating to the client in general.',
          "Program details link back to the client's website, so users don't switch between the app and the site.",
        ] },
        { video: 'donate.mp4', max: '300px', cap: 'After a run, users see their impact and select a specific program to donate to.' },
        { sub: 'Redesigning the donation page' },
        { p: "Even though the donation page wasn't the root cause, I still improved it. I reorganized the information and surfaced the important details upfront to smooth the experience and lift retention." },
        { list: [
          'Added a banner at the top to promote the app.',
          'Included testimonials from both donors and beneficiaries.',
          'Added information about the other donation methods the client offers.',
        ] },
        { img: 'donation-page.jpg', cap: "The redesigned homepage for A Chance in Life." },
      ],
    },
    {
      id: 'testing',
      label: '07 · Testing',
      heading: 'I ran eight impression tests on the app and homepage.',
      blocks: [
        { p: 'Most participants formed the right impression of the app:' },
        { list: [
          'Most rated the app download banner positively.',
          'Some said they would try the app.',
        ] },
        { p: 'Two participants felt the download banner could be more colorful, with too much negative space making it a little bland.' },
        { columns: [
          [ { img: 'test-1.jpg' } ],
          [ { img: 'test-2.jpg' } ],
        ] },
        { img: 'test-3.jpg', cap: 'Impression test results overview.' },
        { sub: 'Iterating on the banner' },
        { p: 'I revised the banner using strong examples from other companies: a real hero image to emphasize running, and a clearer, larger explanation of the program. The result is more colorful and eye-catching, which should lift willingness to download.' },
        { img: 'banner.jpg', cap: "The updated 'Run to Donate' banner after the impression test." },
      ],
    },
    {
      id: 'pitch',
      label: '08 · Pitch',
      heading: 'Bringing the campaign, app, and homepage redesign together in a client pitch.',
      blocks: [
        { p: 'I combined the app and the redesigned homepage into one presentation for the client. They loved the idea, and the CEO mentioned they had previously considered gamification for their website. My concept reinforced how important that direction was.' },
        { columns: [
          [ { img: 'pitch-1.jpg' } ],
          [ { img: 'pitch-2.jpg' } ],
        ] },
      ],
    },
    {
      id: 'next',
      label: '09 · Next Steps',
      heading: 'With positive client feedback, I took the project further into usability testing.',
      blocks: [
        { p: 'I designed a task where users invite a friend to run together and donate the money afterward: invite a friend, start recording the run, stop and check the contribution, then select a program to donate to. This lets me see whether the flow is intuitive and surface issues I had not noticed.' },
        { img: 'wireframes.jpg', cap: "Collage of the 'Run to Donate' app wireframes." },
      ],
    },
    {
      id: 'impact',
      label: '10 · Impact',
      heading: 'My first project with an NGO, and a reminder to solve the real problem, not just the requested one.',
      blocks: [
        { p: 'This project pushed me to think hard about what users actually need, especially for a nonprofit. In research I noticed many NGO competitors use similar layouts, which made me realize how important a unique, engaging campaign is for standing out in a crowded space. The highest-value move was helping the client pivot, rather than just building what they asked for.' },
        { img: 'impact.jpg' },
      ],
    },
  ],
  next: { label: 'Suger Partner Intelligence System', link: '/case-study/suger-prm' },
};

export default aChanceInLife;

const greenpeace = {
  slug: 'greenpeace',
  accent: '#166534',
  accentLight: '#DCFCE7',
  title: "Pitching a 'Greenpeace Ambassador' program to boost volunteer engagement",
  subtitle: "Greenpeace Malaysia couldn't keep volunteers coming back. I designed an ambassador program, and the web app to run it, that turns one-time helpers into long-term, self-directed organizers.",
  tags: ['Service Design', 'NGO', 'Research'],
  heroImage: 'hero.jpg',
  meta: [
    { label: 'Client', value: 'Greenpeace Malaysia' },
    { label: 'Role', value: 'UX + Service Design' },
    { label: 'Industry', value: 'NGO' },
    { label: 'Timeline', value: 'Jul–Sep 2024 · 2.5 mo' },
  ],
  sections: [
    { id: 'context', label: 'Context' },
    { id: 'problem', label: 'Problem' },
    { id: 'program', label: 'The Program' },
    { id: 'webapp', label: 'Web App' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'initiatives', label: 'Initiatives' },
    { id: 'approval', label: 'Approval' },
    { id: 'testing', label: 'Testing' },
    { id: 'pitch', label: 'Pitch' },
  ],
  beats: [
    {
      id: 'context',
      label: '01 · Context',
      heading: 'A global environmental NGO with a volunteer-retention problem',
      blocks: [
        { p: "Greenpeace Malaysia, part of a global environmental network, advocates for sustainable practices to preserve Malaysia's biodiversity and combat climate change. Through community engagement and policy advocacy, it empowers citizens to work toward a healthier planet for future generations." },
      ],
    },
    {
      id: 'problem',
      label: '02 · Problem',
      heading: "Greenpeace Malaysia couldn't retain its volunteers.",
      blocks: [
        { p: 'Greenpeace struggled with volunteer retention because of limited long-term engagement opportunities and a lack of personal ownership over initiatives. My hypothesis: an ambassador program could empower volunteers with more impactful roles and sustain participation over time.' },
        { img: 'problem.jpg', cap: 'After the first event a volunteer joined, there was a significant drop-off before the second.' },
      ],
    },
    {
      id: 'program',
      label: '03 · The Program',
      heading: "I pitched a 'Greenpeace Ambassador' program: a long-term, recurring volunteer experience, in the spirit of programs like Google Local Guides.",
      blocks: [
        { list: [
          'Super volunteers are converted into ambassadors.',
          'Ambassadors are empowered to run their own initiatives.',
          'Greenpeace Malaysia approves each initiative for compliance with local policies.',
        ] },
        { img: 'blueprint.jpg', cap: 'The Greenpeace Ambassador service blueprint.' },
      ],
    },
    {
      id: 'webapp',
      label: '04 · Web App',
      heading: 'A new web app was needed to support the program.',
      blocks: [
        { p: 'I explored three ways for ambassadors to run initiatives and events: a Facebook event, a downloadable PDF manual, and a Greenpeace mobile web app. I chose the mobile web app because:' },
        { list: [
          'Ambassadors get access to default templates.',
          "Ambassadors don't have to create events from scratch.",
          'Tracking event-planning progress is easy.',
          'Ambassadors can invite people through channels beyond Facebook.',
          'Ambassadors can submit event details to Greenpeace for advance approval.',
        ] },
        { img: 'flows.jpg', cap: 'Three candidate flows for ambassadors to run initiatives and events.' },
      ],
    },
    {
      id: 'onboarding',
      label: '05 · Onboarding',
      heading: 'Step 1: super volunteers become ambassadors.',
      blocks: [
        { p: 'Once volunteers become ambassadors, they earn credits by attending or hosting events, redeemable for free items or exclusive activities. This incentivizes long-term participation and fosters a sense of community.' },
        { video: 'onboarding.mp4', max: '300px', cap: "Tapping 'Become an Ambassador' starts the onboarding process." },
      ],
    },
    {
      id: 'initiatives',
      label: '06 · Initiatives',
      heading: 'Step 2: ambassadors are empowered to run three kinds of initiatives.',
      blocks: [
        { list: [
          'Create grassroots projects.',
          'Recruit volunteers.',
          'Mentor future leaders.',
        ] },
        { video: 'initiatives.mp4', max: '300px', cap: 'Ambassadors manage three different initiatives.' },
        { sub: 'Templates for grassroots projects' },
        { p: 'By providing templates, ambassadors are relieved from creating events from scratch, which makes them far more likely to finish the event-creation process.' },
        { video: 'templates.mp4', max: '300px', cap: 'Ambassadors use templates to create an event.' },
      ],
    },
    {
      id: 'approval',
      label: '07 · Approval',
      heading: 'Step 3: the event is sent to Greenpeace Malaysia for approval and policy compliance.',
      blocks: [
        { p: 'From internal interviews, I learned that complex local policies are one of the biggest reasons creating volunteer events is hard. Building approval into the flow keeps ambassadors compliant without slowing them down.' },
        { video: 'approval.mp4', max: '300px', cap: "After creating an event, tapping 'Next' sends the details to Greenpeace Malaysia for approval." },
      ],
    },
    {
      id: 'testing',
      label: '08 · Testing',
      heading: "The program tested well and was well received by Greenpeace's design team.",
      blocks: [
        { p: 'I ran five concept tests on the Ambassador Program, focused on three areas: the conversion from volunteer to ambassador, the credit-based incentive system, and how ambassadors start grassroots projects.' },
        { quote: { text: "I'd definitely stick around longer with a system like this. I like that I can organize my own projects and even get cool rewards, it's engaging and keeps me connected to the bigger mission." } },
        { quote: { text: "The ambassador program is a great idea. It's motivating to know I can earn credits while doing something meaningful, and it's all in one place without jumping between websites." } },
        { p: 'The concept interviews were mostly positive, with most participants interested in signing up. The sample was small, so to validate further I planned first-impression tests such as the five-second test.' },
      ],
    },
    {
      id: 'pitch',
      label: '09 · Pitch',
      heading: 'Bringing the service design and prototype together in a client pitch.',
      blocks: [
        { p: 'I pitched the complete service design, including the mobile touchpoints and the incentive mechanism, through a prototype. The Greenpeace Malaysia team appreciated the ambassador loyalty program and the blend of online and offline engagement, and they plan to implement the legal-compliance checking process online, as demonstrated in my design.' },
        { quote: { text: 'Love the approach, and thanks for the takeaways from the interviewees. Educating volunteers on policies will help them understand our work better and be more engaged with us.' } },
        { quote: { text: 'I like combining online and offline, the reality check on incentive requirements, and the journey to leadership.' } },
      ],
    },
  ],
  next: { label: 'A Chance in Life', link: '/case-study/a-chance-in-life' },
};

export default greenpeace;

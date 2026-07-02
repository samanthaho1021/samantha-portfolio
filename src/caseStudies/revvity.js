const revvity = {
  slug: 'revvity',
  accent: '#1A4D2E',
  accentLight: '#E8F5EC',
  title: "Redesigning Revvity's Homogenizer Workstation",
  subtitle: 'Lab technicians were losing time to a confusing method-creation workflow. What started as a component swap became a full workflow redesign that cut implementation time by 68%.',
  tags: ['B2B SaaS', 'Biotech', 'Workflow Design'],
  heroImage: 'hero.jpg',
  meta: [
    { label: 'Client', value: 'Revvity' },
    { label: 'Role', value: 'Product Designer' },
    { label: 'Industry', value: 'Biotech' },
    { label: 'Timeline', value: 'Sept–Dec 2024 · 3.5 mo' },
  ],
  sections: [
    { id: 'context', label: 'Context' },
    { id: 'ai', label: 'Exploring AI' },
    { id: 'interview', label: 'Interview' },
    { id: 'brainstorm', label: 'Brainstorm' },
    { id: 'design', label: 'Design' },
    { id: 'test', label: 'Testing' },
    { id: 'collaboration', label: 'Collaboration' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'impact', label: 'Impact' },
    { id: 'reflection', label: 'Reflection' },
  ],
  beats: [
    {
      id: 'context',
      label: '01 · Context',
      heading: 'A biotech workstation with a workflow problem',
      blocks: [
        { p: 'Revvity is a global biotech company working in life sciences, diagnostics, and analytical solutions, building tools that support scientific research, drug development, and clinical diagnostics worldwide.' },
        { p: 'On the homogenizer workstation, laboratory technicians were struggling with inefficiency and confusion in the method-creation workflow. The assignment I was handed was narrow: replace the old engineer-built interface with components from our design system. Studying how technicians actually worked revealed the problem ran much deeper than a component swap.' },
        { metrics: [
          { value: '-68%', label: 'Lab technician implementation time' },
          { value: '1.5x', label: 'Team efficiency increase' },
          { value: '47%', label: 'Faster task completion time' },
        ] },
      ],
    },
    {
      id: 'ai',
      label: '02 · Exploring AI Tools',
      heading: 'I experimented with AI-generated wireframes to see how these tools could support my workflow.',
      blocks: [
        { p: "Although I didn't use AI during the actual project, I was curious how well today's tools could handle a complex B2B workflow. I used Lovable to generate alternative wireframes for the method-creation interface and compared them against my own designs." },
        { img: 'ai-lovable.jpg', cap: 'The Lovable interface, generating wireframes from prompts that recreated my workflow.' },
        { video: 'ai-lovable-demo.mp4', cap: 'The Lovable prototype missed rack and probe configuration, and forced technicians to open a step before they could see its parameters.' },
        { p: 'The output was quick and visually coherent, but it missed details that only surfaced in user research: the need to combine step creation with parameter entry, and clear error states for rack and probe configuration. Still, it produced useful starting layouts for early ideation when time is tight.' },
        { callout: { label: 'Takeaway', text: 'Comparing my hand-designed wireframes with the AI-generated ones confirmed it: AI can accelerate layout exploration, but it still lacks the context and nuance you only get from user interviews.' } },
      ],
    },
    {
      id: 'interview',
      label: '03 · Interview',
      heading: 'The brief was to swap components. The interviews showed the real problem was the workflow.',
      blocks: [
        { p: 'To understand technician workflows and pain points during a task, I ran semi-moderated interviews with lab technicians. Three issues came up again and again.' },
        { quote: { label: 'Poor method management', text: "If I want to tweak a method I made before, I can't tell what's inside without basically rebuilding it." } },
        { quote: { label: 'Unclear favorites', text: 'I never know which favorite to pick, I have to open each one just to check what settings it has.' } },
        { quote: { label: 'Repetitive setup', text: 'Every time I add a step, I have to redo the rack and probe settings again. It is really repetitive.' } },
        { img: 'interview-workflow.jpg', cap: 'The current UX for selecting a method and adding a method step, with the friction points mapped out.' },
        { callout: { label: 'The reframe', text: 'These findings showed the problem went far beyond a UI update. Simply swapping components would have kept the inefficiencies intact and missed the chance to fix the workflow itself.' } },
      ],
    },
    {
      id: 'brainstorm',
      label: '04 · Brainstorm',
      heading: 'I reworked the method-creation workflow to simplify it within the design-system mandate.',
      blocks: [
        { p: 'To simplify the original flow, I combined two steps that used to be separate: adding a method step and entering its parameters. I also moved layout configuration (selecting the rack, probe, tips, and well plate) up front. This way, technicians no longer reconfigure settings every time they add a new step.' },
        { img: 'brainstorm-workflow.jpg', cap: 'The new workflow eliminates the repeated setup steps to streamline the process.' },
      ],
    },
    {
      id: 'design',
      label: '05 · Design',
      heading: 'From the new workflow, I built concepts for how the product could actually work.',
      blocks: [
        { p: "Feedback from technicians showed that about 90% of them don't need a different deck layout for each method step. That let me move deck selection to right after a method is created, which drastically simplified the flow." },
        { video: 'design-deck.mp4', cap: 'Technicians pick the deck layout immediately after tapping + New Method.' },
        { sub: 'Creating a method' },
        { p: 'The restructured creation flow: 1) name the method, 2) configure the deck layout, 3) add method steps and input parameters for each, 4) confirm and create.' },
        { video: 'design-create.mp4', cap: 'Creating a new method.' },
        { sub: 'Running a method' },
        { p: 'To run a method: 1) select it from the method list, 2) configure the deck layout, 3) confirm the well plate and select pipette tips, 4) define samples on the top or bottom deck, 5) review the setup, confirm the parameters, and run.' },
        { video: 'design-run.mp4', cap: 'Running a selected method.' },
      ],
    },
    {
      id: 'test',
      label: '06 · Testing',
      heading: 'Usability testing showed simpler flows, but exposed one confusion: technicians were unsure they could edit a method after tapping its card.',
      blocks: [
        { p: "They didn't realize that tapping the method-steps panel opened a details page where editing was possible, which could add operation time. To fix it, I added an expanded parameters section with clear Edit and Delete buttons right on the panel." },
        { img: 'test-before.jpg', cap: 'Before: technicians could only tap the panel to view parameters on a separate page. Testing showed this was not intuitive.' },
        { video: 'test-before-demo.mp4', cap: 'Before: parameter details lived on a separate page.' },
        { img: 'test-after.jpg', cap: 'After: parameters are visible inline, with Edit and Delete available right on the panel.' },
        { video: 'test-after-demo.mp4', cap: 'After: technicians edit or delete a method directly from the panel.' },
      ],
    },
    {
      id: 'collaboration',
      label: '07 · Collaboration',
      heading: 'I worked with engineers to keep the redesign feasible to build.',
      blocks: [
        { p: 'To hand the design off cleanly, I annotated the flows so the development team knew exactly how each screen should behave:' },
        { list: [
          'Show clearly which button moves the technician to the next step.',
          'Show where the two workflows intersect.',
          'Mark where technicians can expand to view extended information.',
          'Specify where technicians choose what to view on the page.',
        ] },
        { img: 'collab-annotated.jpg', cap: 'A zoomed-out view of the wireframe flows, annotated to support collaboration with the development team.' },
      ],
    },
    {
      id: 'documentation',
      label: '08 · Documentation',
      heading: 'I documented the design decisions and rationale for future reference.',
      blocks: [
        { p: 'Since no prior documentation of the bench workflows existed, I created detailed records of the redesigned method-creation flow, including the decision points technicians encounter along the way. This gives future designers a consistent reference for similar workflows and keeps the system scalable.' },
        { img: 'doc-workflow.jpg', cap: 'The method-execution workflow, documented for improved future scalability.' },
      ],
    },
    {
      id: 'impact',
      label: '09 · Impact',
      heading: 'The final designs measurably improved technician efficiency and satisfaction.',
      blocks: [
        { metrics: [
          { value: '-68%', label: 'Lab technician implementation time' },
          { value: '1.5x', label: 'Team efficiency increase' },
          { value: '47%', label: 'Faster task completion time' },
        ] },
      ],
    },
    {
      id: 'reflection',
      label: '10 · Reflection',
      heading: 'I learned to look past the brief and adapt both process and tools to deliver better UX.',
      blocks: [
        { sub: 'What I learned' },
        { list: [
          'A task that starts as a simple component swap can uncover deeper UX flaws once you actually study users.',
          'A design system enforces consistency, but it needs thoughtful extensions to support complex workflows.',
          'AI tools can speed up low-fidelity exploration, but they still rely on user insight to stay relevant and usable.',
        ] },
        { sub: "What I'd do differently" },
        { list: [
          'Bring AI wireframe generation in earlier to spark layout options quickly, then refine with research findings.',
          'Push for early user validation of wireframes to confirm efficiency improvements before development.',
          'Advocate for post-launch usability checks to measure real workflow impact and efficiency gains.',
        ] },
      ],
    },
  ],
  next: { label: 'Tax Management', link: '/case-study/tax-management' },
};

export default revvity;

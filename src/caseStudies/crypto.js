const crypto = {
  slug: 'crypto',
  accent: '#7C2D12',
  accentLight: '#FEF3EC',
  title: 'Redesigning a Crypto Trading Dashboard: a smarter source input for TradingView',
  subtitle: "Strategy developers couldn't add new input sources once a strategy was built. I rebuilt the source-input flow around modular system objects, cutting strategy-creation time by 15% and lifting successful deployments by 40%.",
  tags: ['Dashboard', 'Data Viz', 'B2B SaaS'],
  heroImage: 'hero.mp4',
  meta: [
    { label: 'Client', value: 'Crypto Arsenal' },
    { label: 'Role', value: 'UX Designer' },
    { label: 'Industry', value: 'Fintech / Blockchain' },
    { label: 'Timeline', value: 'Jan–Apr 2023 · 4 mo' },
  ],
  sections: [
    { id: 'context', label: 'Context' },
    { id: 'problem', label: 'Problem' },
    { id: 'discovery', label: 'Discovery' },
    { id: 'objects', label: 'System Objects' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'prompts', label: 'Prompts' },
    { id: 'handoff', label: 'Handoff' },
    { id: 'impact', label: 'Impact' },
  ],
  beats: [
    {
      id: 'context',
      label: '01 · Context',
      heading: 'An automated-trading platform where building a strategy was harder than it should be',
      blocks: [
        { p: 'Crypto Arsenal provides a white-label automated-trading solution, software modules and a platform that help crypto exchanges and asset managers rapidly enable algo-driven social and copy trading, boosting market participation, trading volume, and new users.' },
        { metrics: [
          { value: '15%', label: 'Team efficiency increase' },
          { value: '200+', label: 'New subscribers monthly' },
        ] },
      ],
    },
    {
      id: 'problem',
      label: '02 · Problem',
      heading: 'Strategy developers struggled to incorporate new input sources.',
      blocks: [
        { p: 'Input sources are essential: the TradingView platform aggregates market data from over 150 exchanges worldwide, offering access to 2 million instruments. But the interface made it difficult for strategy engineers to add new sources once a strategy had been created.' },
        { p: "Other usability issues, like the hidden chart icon and the lack of structure for handling raw trading data, further limited flexibility and slowed development. These gaps reduced the platform's ability to fully leverage its TradingView integrations and support subscriber growth." },
        { img: 'problem.jpg', cap: 'An artifact illustrating the problem strategy developers were struggling with.' },
      ],
    },
    {
      id: 'discovery',
      label: '03 · Discovery',
      heading: 'I defined new system objects from engineer interviews.',
      blocks: [
        { p: 'System objects were needed to simplify how engineers build strategies. The platform lacked abstraction layers, so I interviewed engineers and created higher-level objects:' },
        { list: [
          'Trading Source Selector: choose and configure input sources such as candle data, APIs, TradingView integration, and machine-learning algorithms.',
          'Exchange and Pair Selector: specify which market (exchange and trading pair) a strategy operates on.',
          'Strategy Configuration Module: a structured object to pick a template and define strategy parameters before finalizing.',
        ] },
        { img: 'discovery.jpg', cap: 'The new system objects across two design phases.' },
      ],
    },
    {
      id: 'objects',
      label: '04 · System Objects',
      heading: 'The new system objects were a success.',
      blocks: [
        { p: 'Before this, engineers built strategies in an unstructured way, often hardcoding logic without reusable components. By defining modular system objects, I established a shared mental model across the team. This decision laid the groundwork for multi-source strategies and strategy simulation.' },
        { img: 'objects.jpg', cap: 'Before and after defining the new system objects.' },
      ],
    },
    {
      id: 'workflow',
      label: '05 · Workflow',
      heading: 'Next, I built a step-by-step strategy-creation workflow.',
      blocks: [
        { p: 'Strategy engineers can pick from a range of trading sources (Python, API, machine learning, and TradingView) after starting a strategy, but there was no guided flow. I structured one:' },
        { list: [
          'After clicking Create Strategy, select an exchange and trading pair.',
          'Choose a trading source: candle data, TradingView, API, or machine learning.',
          'Choose a code-base template within that source.',
          'For TradingView and API sources, set up the signal information.',
          'Complete the strategy creation.',
        ] },
        { img: 'workflow.jpg', cap: 'The step-by-step strategy-creation workflow.' },
      ],
    },
    {
      id: 'challenge',
      label: '06 · Challenge',
      heading: 'I fixed the irreversible choices in the setup flow.',
      blocks: [
        { p: "Engineers couldn't switch the strategy configuration module after selecting their initial trading source. Many assumed they could change to a more suitable module midway, only to find they had to start over. To resolve it, I reworked the strategy name card:" },
        { list: [
          'Display the exact strategy configuration module selected at the start.',
          'Add an edit icon next to the module name so it is clearly changeable.',
        ] },
        { p: 'These changes improved transparency and prevented frustration during setup.' },
        { img: 'challenge.jpg', cap: 'Before and after the strategy-setup iteration.' },
      ],
    },
    {
      id: 'prompts',
      label: '07 · Prompts',
      heading: 'I added inline prompts so engineers stay in context.',
      blocks: [
        { sub: 'Add a source after changing the module' },
        { p: 'When an engineer changes the module, a prompt reminds them to add a corresponding source, keeping the module aligned with its data inputs. It appears inline in the workflow, so they never have to leave the setup.' },
        { img: 'prompt-1.jpg', cap: 'The prompt to add a corresponding source after changing the module.' },
        { sub: 'Change the module after adding a source' },
        { p: 'A reverse prompt complements the flow: it appears directly in the source-adding flow, so engineers do not need to hunt for the edit button or exit setup. This keeps continuity and reduces friction, especially for complex, multi-source strategies.' },
        { img: 'prompt-2.jpg', cap: 'The prompt that guides engineers to optionally change the module after adding a new source.' },
      ],
    },
    {
      id: 'handoff',
      label: '08 · Engineering Handoff',
      heading: 'I documented the webhook parameters for engineering handoff.',
      blocks: [
        { p: 'I created clear documentation and diagrams to support handoff: a parameter reference guide for setting up trading sources, a simulation diagram to walk new engineers through live trade testing with TradingView, and a webhook message map showing exactly what to copy and paste when creating trading alerts.' },
        { img: 'handoff.jpg', cap: 'The documentation I created for the engineering handoff.' },
      ],
    },
    {
      id: 'impact',
      label: '09 · Impact',
      heading: '15% faster strategy creation, and 40% more deployments.',
      blocks: [
        { p: 'Despite the technical difficulty of integrating multiple data sources and maintaining compatibility across code bases, the redesigned flow cut strategy-creation time by 15% and drove a 40% increase in successful strategy deployments using TradingView sources.' },
        { metrics: [
          { value: '-15%', label: 'Strategy creation time' },
          { value: '+40%', label: 'Successful deployments (TradingView)' },
        ] },
      ],
    },
  ],
  next: { label: 'Greenpeace Ambassador Program', link: '/case-study/greenpeace' },
};

export default crypto;

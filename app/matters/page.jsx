import MattersClient from './MattersClient';

export var metadata = {
  title: 'Select Matters — Representative Engagements | Arthur Karadzhyan',
  description: 'Representative PAGA defense, wage-and-hour class action, and workplace investigation engagements. Exposure modeling, class certification opposition, forensic payroll analysis, and settlement approval outcomes.',
  openGraph: {
    title: 'Select Matters | Arthur Karadzhyan',
    description: 'Representative defense engagements with specific, identifiable outcomes in PAGA, wage-and-hour, and employment litigation.',
    type: 'website',
  },
};

export default function MattersPage() {
  return <MattersClient />;
}

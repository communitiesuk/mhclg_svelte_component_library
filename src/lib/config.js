export const subFoldersLookup = {
  ui: { label: 'User interaction' },
  'data-vis': { label: 'Data visualisation' },
  layout: { label: 'Layout' },
};

export const componentStausLookup = {
  to_be_developed: { bgColor: '#A23E48', color: 'white' },
  in_progress: { bgColor: '#FF8C42', color: 'black' },
  complete_untested: { bgColor: '#FFF275', color: 'black' },
  complete_in_use: { bgColor: '#9E8FB2', color: 'black' },
  complete_accessible: {
    bgColor: '#33658A',
    color: 'white',
  },
};

export const propPillLookup = {
  true: {
    text: '{p}',
    textColor: 'white',
    bgColor: '#ba029b',
    padding: '0.2rem 0.3rem 0.4rem 0.3rem',
  },
  false: {
    text: '=>',
    textColor: 'white',
    bgColor: '#00695c',
    padding: '0.25rem 0.3rem 0.3rem 0.25rem',
  },
};

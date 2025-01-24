export const foldersLookup = {
  'ui': 'user interaction',
  'data-vis': 'data visualisation'
};

export const componentStausLookup = {
  "To be developed": { bgColor: '#A23E48', color: 'white' },
  "In progress": { bgColor: '#FF8C42', color: 'black' },
  "Completed": { bgColor: '#FFF275', color: 'black' },
  "Accessible": { bgColor: '#33658A', color: 'white' },
  "Progressively enhanced": { bgColor: '#9E8FB2', color: 'black' },
  "Responsive": { bgColor: '#9E8FB2', color: 'black' },
  "Tested": { bgColor: '#9E8FB2', color: 'black' },
  "In use": { bgColor: '#9E8FB2', color: 'black' },

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

export const defaultScreenWidthBreakpoints = {
  xs: 420,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

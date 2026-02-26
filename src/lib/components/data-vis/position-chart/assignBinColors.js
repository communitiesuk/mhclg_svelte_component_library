export function assignBinColors(bins, colors) {
    const totalValues = bins.reduce((sum, b) => sum + b.count, 0);
    const maxIndex = colors.length - 1;
  
    let cumulative = 0;
    return bins.map(bin => {
      const t = totalValues === 0 ? 0 : (cumulative + bin.count / 2) / totalValues;
      const index = Math.round(t * maxIndex);
      cumulative += bin.count;
  
      return colors[index] ;
    });
  }
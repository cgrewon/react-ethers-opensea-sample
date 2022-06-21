export function shortenNumber(value) {
  if( value === undefined) return 0;
  const parsed1 = value.toString();
  const parsed = parseInt(parsed1).toString();
  
  if (parsed.length < 4) {
      return parsed1;
  } 
  if( parsed.length < 7) {
    const ret = value.toString();
    const realRet = parseInt(ret) / 1000;
    return `${realRet}K`;
  }
  if( parsed.length < 10 ) {
    const newValue = (value/100);
    const ret = newValue.toString();
    const realRet = parseInt(ret) / 10000;
    return `${realRet}M`;
  }
  const newValue = (value/100000);
  const ret = newValue.toString();
  const realRet = parseInt(ret) / 10000;
  return `${realRet}B`;
}
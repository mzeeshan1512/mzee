const pxToRem = (px: number) => {
  const base = 16;
  const rem = px / base;
  return `${rem}rem`;
};

const adjustChildTopRelativeToParent = (parentId: string, childId: string) => {
  let headerHeight: any = document?.getElementById(parentId)?.offsetHeight;
  if (headerHeight < 10) {
    headerHeight = 10;
  }
  const container: any = document?.getElementById(childId);
  container?.setAttribute("style", `top:${pxToRem(headerHeight + 4)};`);
};

const colors = {
  primary: '#2a85a1',
  primary25: '#123649',
  primary35: '#3551a4',
  secondary: '#205b83',
  secondary25: '#194d67',
  secondary35: '#31cdb0'
};

export { pxToRem, adjustChildTopRelativeToParent, colors };

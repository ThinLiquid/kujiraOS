const win = System.requestNewWindow('layer', 'bottom')

new HTML('div')
  .style({
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(-164deg, #FCA3A3, #FFE46A)'
  })
  .to(win)

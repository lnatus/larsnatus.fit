const { $ } = window

$(document).ready(() => {
  const tp =  new LNF.Components.TrainingsPlaner()
  tp.init()
  $('#lnf-app-trainingsplaner-run').click(()=>{
    tp.run()
  })
})

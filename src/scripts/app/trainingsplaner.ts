const { $ } = window

namespace LNF {

  namespace Apps {
    export class TrainingsPlaner {

      public render () {
        const $container = $('#js-lnf-app-trainingsplaner-result')[0];

        const result = `<div>
                          Result goes here...
                        </div>`

        $container.innerHTML = result
      }
    }

  }

}

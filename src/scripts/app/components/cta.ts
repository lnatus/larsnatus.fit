namespace LNF {
  export namespace Components {
    export class CallToAction {
      private fb = "#lnf-cta-fb"
      private fbClose = "#lnf-cta-fb-close"

      public init () {
        const $fb = $(this.fb);
        const $fbClose = $(this.fbClose)

        $fbClose.click(() => {
          $fb.slideToggle('slow')
        })
        setTimeout(() => {
          $fb.slideToggle('slow')
        }, 30000)
      }
    }
  }
}

import { withPluginApi } from "discourse/lib/plugin-api";
import loadScript from "discourse/lib/load-script";

export default {
  name: "initialize-for-scoreCard",
  initialize() {
    withPluginApi("0.8", api => {
      // Decorates posts with scoreCard
      api.decorateCooked(
        $elem => {
          const scoreCard = $('[data-wrap="scoreCard"]', $elem);
          if (!scoreCard.length) return;
          console.log('here');

          loadScript(
            "../../score-card.js"
          ).then(() => {
            console.log('554272');
            scoreloadByEventID(554272);
            //scoreCard.dataTable();
          });
        },
        { id: "discourse-scoreCard", onlyStream: true }
      );

      // Handles translations for composer
      let translations = I18n.translations[I18n.currentLocale()].js;
      if (!translations) {
        translations = {};
      }

      if (!translations.composer) {
        translations.composer = {};
      }

      translations.scoreCard_button = "Add Score Card";
      translations.composer.scoreCard_add_table_prompt = '<div class="tabs" id="score-card">' +
      '<div role="tablist" aria-label="Entertainment">' +
        '<button role="tab"    aria-selected="true"  aria-controls="line-ups-tab"  id="line-ups">Line-ups</button>' +
        '<button role="tab"   aria-selected="false"  aria-controls="statistics-tab" id="statistics"  tabindex="-1">Statistics</button>' +
        '<button role="tab"   aria-selected="false"  aria-controls="key-events-tab" id="line-ups"  tabindex="-1">Key Events</button>' +
        '<button role="tab"   aria-selected="false"  aria-controls="commentary-tab" id="commentary"  tabindex="-1">Commentary</button>' +
      '</div>' +
      '<div tabindex="0" role="tabpanel" id="line-ups-tab" aria-labelledby="line-ups" class="holds-the-iframe">' +
      '</div>' +
      '<div tabindex="0" role="tabpanel" id="statistics-tab" aria-labelledby="statistics" hidden="" class="holds-the-iframe">' +
      '</div>' +
      '<div tabindex="0" role="tabpanel" id="key-events-tab" aria-labelledby="key-events" hidden="" class="holds-the-iframe">' +
      '</div>' +
      '<div tabindex="0" role="tabpanel" id="commentary-tab" aria-labelledby="commentary" hidden="" class="holds-the-iframe">' +
      '</div>' +
      '</div>' +
      '<script type="text/javascript">scoreloadByEventID(554272)</script>';

      // Adds dataTable button to the composer
      api.onToolbarCreate(function(toolbar) {
        toolbar.addButton({
          trimLeading: true,
          id: "scoreCard",
          group: "insertions",
          icon: "check",
          title: "scoreCard_button",
          perform: function(e) {
            return e.applySurround(
              "[wrap=scoreCard]\n\n",
              "\n\n[/wrap]",
              "scoreCard_add_table_prompt",
              { multiline: false }
            );
          }
        });
      });
    });
  }
};

import { withPluginApi } from "discourse/lib/plugin-api";
import loadScript from "discourse/lib/load-script";

export default {
  name: "initialize-for-scoreCard",
  initialize() {
    withPluginApi("0.8", api => {
      // Decorates posts with scoreCard
      api.decorateCooked(
        $elem => {
          const scoreCard = $('[data-wrap="scoreCard"] table', $elem);
          if (!scoreCard.length) return;

          loadScript(
            "score-card.js"
          ).then(() => {
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
      translations.composer.scoreCard_add_table_prompt = "Score Card";

      // Adds dataTable button to the composer
      api.onToolbarCreate(function(toolbar) {
        toolbar.addButton({
          trimLeading: true,
          id: "scoreCard",
          group: "insertions",
          icon: "table",
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

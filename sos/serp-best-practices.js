function popUp(item) {
  window.open("/sos/serp-best-practices.html#" + item, "popUpWindow", "height=600, left=" +
    (screen.width/2 - 416) + ", menubar=no, modal=yes, toolbar=no, top=" + (screen.height/2 - 300) + ", width=832");
}

(function() {

  $("head").append(
    "<style>" +
      ".bp { font-size: 0.8em; line-height: 1.2em; padding-top: 0; text-align: right; }" +
      ".bp a, .bp a:hover { color: #eee; text-decoration: underline; }" +
    "</style>"
  );

  var warning = {};

  $("tr").slice(-7).each(function() {
    var $this = $(this);

    var item = $this.find("td[id$='A-value']").attr("id").slice(0, -7);
    var $newLine = $("<tr><td class='border-right'></td><td id='" + item + "A-value-critical' class='border-right bp' " +
      "colspan='2'></td><td id='" + item + "B-value-critical' class='bp' colspan='2'></td></tr>");
    
    $newLine.insertAfter(this);

    warning[item] = "<i class='icon-warning-sign'></i> This score is suboptimal!<br />" +
        "<a href='javascript:popUp(\"" + item + "-causes\")'>Potential Causes</a><br />" +
        "<a href='javascript:popUp(\"" + item + "-countermeasures\")'>Proposeed Adjustments</a>";
  });

  window.setInterval(function() {
    $.each(["A", "B"], function(i, v) {
      $("td[id$='" + v + "-value']").each(function() {
        var $this = $(this);

        var item = $this.attr("id").slice(0, -7);
        var value = parseFloat($this.text().substr(0,3));

        if (!isNaN(value) && value < 0.4) {
          $("#" + item + v + "-value-critical").html(warning[item]);
        }
      });
    });
  }, 1000);

})(jQuery);
// Generated by CoffeeScript 1.3.3
(function() {

  $(function() {
    var $boxes, $color, $input, update_boxes, _ref;
    _ref = [$("#color"), $(".colortext"), $("#input").focus()], $color = _ref[0], $boxes = _ref[1], $input = _ref[2];
    $boxes.each(function() {
      return $(this).text($(this).data("default"));
    });
    update_boxes = function(color) {
      $input.removeClass("error").addClass("valid");
      $boxes.each(function() {
        var $current, into;
        $current = $(this);
        into = $current.attr("id");
        return $current.text(color.convert(into));
      });
      return $color.css("background-color", color.toString());
    };
    $input.keyup(function() {
      var color, input;
      input = $input.val();
      localStorage["input"] = input;
      if (input.length === 0) {
        $input.removeClass("error valid");
        return;
      }
      color = parseColor(input);
      if (color) {
        return update_boxes(color);
      } else {
        return $input.removeClass("valid").addClass("error");
      }
    });
    $input.click(function() {
      return $input.select();
    });
    $boxes.click(function() {
      var $this, rgb, text;
      $this = $(this);
      text = "";
      if ($this.attr("class").indexOf("single") > -1) {
        rgb = [];
        $(".single").each(function(el) {
          return rgb[el] = $(this).text();
        });
        text = rgb.join(",");
      } else {
        text = $this.text();
      }
      return $input.val(text).select().trigger("keyup");
    });
    $color.click(function() {
      return $input.val($color.css("background-color")).select().trigger("keyup");
    });
    if (localStorage["input"] != null) {
      return $input.val(localStorage["input"]).select().trigger("keyup");
    }
  });

}).call(this);

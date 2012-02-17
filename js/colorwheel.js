$(function(){
  var $color = $('#color'), $input = $('#input'), $boxes = $('.colortext'),
    $HSV = $('.HSV');

  $input.select();
  
  $boxes.each(function() {
    $this = $(this);
    $this.text($this.attr('data-default'));
  });
  
  $input.keyup(function() {
    var color = parseColor($input.val());
    if (color) {
      var HSV = color.toHSV();
      $HSV.val(HSV.hue + "." + HSV.saturation + "." + HSV.value);
      $input.removeClass('error');
      $boxes.each(function() {
        var $current = $(this);
        var into = $current.attr('id');
        $current.text(color.convert(into));
      });
      $color.css('background-color', color.convert('rgb'));
    } else {
      $input.addClass('error');
    }
  }).click(function() {
    $input.select();
  });
  
  $boxes.click(function() {
    $this = $(this);
    if ($this.attr('class').indexOf('single') > -1) {
      var rgb = [];
      $('.single').each(function(i) {
        rgb[i] = $(this).text();
      });
      $input.val(rgb.join(', '));
    } else {
      $input.val($this.text());
    }
    $input.select();
  });
  $color.click(function() {
    $input.val($color.css('background-color'));
    $input.trigger('keyup');
    $input.select();
  });
});

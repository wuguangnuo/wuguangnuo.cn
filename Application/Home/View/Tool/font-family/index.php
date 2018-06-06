<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>字体样式</title>
    <style>
      #ch table{font-size:1.5em;}
      #en table{font-size:1em;}
      @font-face{font-family:Gilbert Bold-Preview;src:url("http://oourcagfr.bkt.clouddn.com/201710/Gilbert.otf");}
    </style>
  </head>

  <body>
    <h2>中文字体：</h2>
    <div id="ch">
    <?php
      $family = array('SimHei','SimSun','NSimSun','FangSong','KaiTi','FangSong_GB2312','KaiTi_GB2312','Microsoft YaHei','Microsoft JhengHei');
      for($i=0;$i<count($family);$i++)
        echo "<strong>".$family[$i]."</strong><table><tbody><tr><td style=\"font-family: '".$family[$i]."';\">凡心所向，素履所往，生如逆旅，一苇以航。</td></tr></tbody></table>";
     ?>
    </div>

    <h2>英文字体：</h2>
    <div id="en">
    <?php
      $family = array('PmingLiu','Impact','Georgia','Tahoma','Arial','Book Antiqua','Century Gothic','Courier New','Times New Roman','Verdana','Tahoma','Helvetica','Hiragino Sans GB','Gilbert Bold-Preview');
      for($i=0;$i<count($family);$i++)
      echo "<strong>".$family[$i]."</strong><table><tbody><tr><td style=\"font-family: '".$family[$i]."';\">&nbsp;!\"#$%&'()*+,-./<br />0123456789:;&lt=&gt?<br />@ABCDEFGHIJKLMNO<br />PQRSTUVWXYZ[\]^_<br />`abcdefghijklmno<br />pqrstuvwxyz{|}~</td></tr></tbody></table>";
    ?>
    </div>
  </body>
</html>
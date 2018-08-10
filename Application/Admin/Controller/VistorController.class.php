<?php
namespace Admin\Controller;
use Think\Controller;

class VistorController extends AdminController {
	public function index() {
		$sql = 'SELECT ip FROM wu_vistor;';
		$Form = M();
		$data = json_encode($Form->query($sql), 320);
		$arr = json_decode($data, true);
		$url = "http://ip.taobao.com/service/getIpInfo.php?ip=";
		echo '<table border="1"><thead><th>IP(long)</th><th>IP</th><th>region</th><th>city</th><th>isp</th></thead><tbody>';
		for($i = 0; $i < count($arr); $i++) {
			$data = (array)(json_decode(file_get_contents($url.long2ip($arr[$i]['ip']))))->data;
			echo '<tr>';
			echo '<td>'.$arr[$i]['ip'].'</td>';
			echo '<td>'.$data['ip'].'</td>';
			echo '<td>'.$data['region'].'</td>';
			echo '<td>'.$data['city'].'</td>';
			echo '<td>'.$data['isp'].'</td>';
			echo '</tr>';
		}
		echo '</tbody></table>';
	}
}
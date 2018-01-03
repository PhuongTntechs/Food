<?php
	// connect wp load
	$parse_uri = explode('wp-content', $_SERVER['SCRIPT_FILENAME']);
	require_once( $parse_uri[0] . 'wp-load.php' );
	//global $wpdb, $PasswordHash, $current_user, $user_ID;

	//Catch the data from App
  $json = file_get_contents("php://input");
  $obj = json_decode($json, TRUE);

	//$obj['Action'] = 'getListPostCustomMeal';
	//$obj['idUser'] = 2;
	//$obj['date'] = '2017-5-7';
	//$obj['buoi'] = 'l';

	if( $obj ){
		// check action
		switch ($obj["Action"]) {
			case 'login':
				$response =	login_default($obj);
				break;

			case 'register':
				$response =	register($obj);
				break;

			case 'listpost':
				$response =	listpost($obj);
				break;

			case 'singleProduct':
				$response =	get_product($obj);
				break;

			// using category page
			case 'getCat':
				$response =	get_list_cat($obj);
				break;

			case 'listPostFavorites':
				$response =	listPostFavorites($obj);
				break;

			case 'deleteItemFa':
				$response =	actionItemFa($obj);
				break;

			case 'addItemFa':
				$response =	actionItemFa($obj);
				break;

			case 'checkFav':
				$response =	actionItemFa($obj);
				break;

			case 'getlistpostshoptab':
				$response =	getlistpostshoptab($obj);
				break;

			case 'addFoodNameItem':
				$response =	addFoodNameItem($obj);
				break;

			case 'addFoodName':
				$response =	addFoodNameItem($obj);
				break;

			case 'deleteItem':
				$response =	deleteItem($obj);
				break;

			case 'checkedItemShop':
				$response =	checkeditemshop($obj);
				break;

			case 'unCheckedItemShop':
				$response =	checkeditemshop($obj);
				break;

			case 'editShop':
				$response =	editShop($obj);
				break;

			case 'clearCheckedCurrentShop':
				$response =	clearCheckedCurrentShop($obj);
				break;

			case 'clearcheckallShop':
				$response =	handleclearcheckallShop($obj);
				break;

			case 'deleteAllShop':
				$response =	handleDeleteAllShop($obj);
				break;

			case 'deleteCurrentShop':
				$response =	deleteCurrentShop($obj);
				break;

			case 'getListPostMealPlan':
				$response =	getListPostMealPlan($obj);
				break;

			case 'addPostmealPlan':
				$response =	addPostmealPlan($obj);
				break;

			case 'getListPostCustomMeal':
				$response =	handelGetListPostCustomMeal($obj);
				break;

			case 'deleteItemListMeal':
				$response =	deleteItemListMeal($obj);
				break;

			case 'addPostMealCustom':
				$response =	addPostMealCustomProcess($obj);
				break;

			case 'deleteWeek':
				$response =	deleteWeek($obj);
				break;

			case 'getDataSettingUser':
				$response =	getDataSettingUser($obj);
				break;

			case 'getCurrentAvatar':
				$response =	getCurrentAvatar($obj);
				break;

			case 'editUser':
				$response =	editUserProcess($obj);
				break;

			case 'searchResult':
				$response =	searchResult($obj);
				break;

			case 'FilterData':
				$response =	FilterData($obj);
				break;

			case 'getListSlider':
				$response =	getListSlider($obj);
				break;

			case 'getCatTipItem':
				$response =	getCatTipItem($obj);
				break;

			case 'loginFB':
				$response =	loginFbProcess($obj);
				break;

			case 'loginGG':
				$response =	loginGGProcess($obj);
				break;

			case 'GoPremium':
				$response =	GoPremium($obj);
				break;

			case 'checkRoleUser':
				$response =	checkRoleUser($obj);
				break;

			case 'checkDaysPremium':
				$response =	checkDaysPremium($obj);
				break;

		}
		echo json_encode($response);
	}else{
		?>{"error":"ERROR"}<?php
	}

	function checkDaysPremium($obj) {
		$response = array();
		if( $obj['idUser'] ) {
			$days = getDaysCl_Premium($obj['idUser']);
		}
		$response['days'] = $days;
		return $response;
	}

	function checkRoleUser($obj) {
		if(isset($obj['idUser'])) {
			$response = array();
			$response['roleUser'] = updateRoleUser($obj['idUser']) ? getRoleUser($obj['idUser']) : 'error';
		}
		return $response;
	}

	function GoPremium($obj) {
		$response = array();
		if (isset($obj['idUser']) && isset($obj['money']) && isset($obj['transaction']) && isset($obj['currency'])){
			$idUser = $obj['idUser'];
			$money = $obj['money'];
			$transaction = $obj['transaction'];
			$currency = $obj['currency'];
			$payment_method = 'Paypal';

			if (upgrade($idUser, $money, $transaction, $payment_method, $currency)){
				$response['mess'] = 'You are premium user';
				$response['status'] = 'success';
			} else {
				$response['mess'] = 'Have an error';
				$response['status'] = 'error';
			}
		}
		return $response;
	}

	function loginGGProcess($obj) {
		$response = array();
		if (isset($obj['idGg']) && isset($obj['name']) && isset($obj['email'])){
			if (checkLoginGg($obj['idGg'], $obj['name'], $obj['email'])){
				$idUser = getIdUser_ByIdGg($obj['idGg']);
				$role= getRoleUser($idUser);
				$username = "GgId:-".$obj['idGg'];
				$response = array(
					"username" => $username,
					"status" => 'Successful',
					"messenger" => 'login GG Successful',
					"id_user" => $idUser,
					"role" => $role,
				);

			}else{
				$response['status'] = 'error';
				$response['messenger']="Email already exists";
			}
		} else {
			$response['status'] = 'error';
			$response['messenger']="Data error";
		}
		return $response;
	}

	function loginFbProcess($obj) {
		$response = array();
		if( isset($obj['ID']) ) {
			$idFb = $obj['ID'];
			$name = $obj['name'];
			$email = '';
			$username = "FbId:-".$idFb;

			if (checkLoginFb($idFb, $name, $email)){
				$idUser = getIdUser_ByIdFb($idFb);
				$role= getRoleUser($idUser);
			};

			$response = array(
				"username" => $username,
				"status" => 'Successful',
				"messenger" => 'login FB Successful',
				"id_user" => $idUser,
				"role" => $role,
			);
		} else {
			$response['status'] = 'error';
		}
		return $response;
	}

	function getCatTipItem($obj) {
		$response = array();

		if (isset($obj['idCat'])){
			$idCat = $obj['idCat'];
			$response = getlistItemCatTip($idCat);
		} else {
			$response['mess'] = 'fucking wow shit';
		}
		return $response;
	}

	function getListSlider($obj) {
		$response = array();
		$response = getlistsliderhome();
		$response = addThumbnalToArrPost($response);

		return $response;
	}

	function FilterData($obj) {
		$response = array();
		$args = array(
			'posts_per_page'   => -1,
			'orderby'          => 'title',
			'order'            => 'ASC',
			'post_type'        => 'substitutes',
			'post_status'      => 'publish',
			'suppress_filters' => true
		);

		if (isset($obj['role']) && $obj['role'] != "userPremium"){
			$args = array(
				'posts_per_page'   => -1,
				'orderby'          => 'title',
				'order'            => 'ASC',
				'meta_key'         => 'role',
				'meta_value'       => 'userNormal',
				'post_type'        => 'substitutes',
				'post_status'      => 'publish',
				'suppress_filters' => true
			);
		}
		$response = get_posts( $args );
		$response = addThumbnalToArrPost($response);

		//add content html post
		foreach($response as $itemPost){
			$content = apply_filters('the_content', $itemPost->post_content);
			$content = str_replace(']]>', ']]&gt;', $content);
			$itemPost->content = $content;
		}
		return $response;
	}

	function searchResult($obj) {
		$response = array();

		if (isset($obj['title'])){
			$title = $obj['title'];
			$response = search($title);
			$response = addThumbnalToArrPost($response);
		}else{
			$response['mess'] = 'text search is null';
		}
		return $response;
	}

	function editUserProcess($obj) {
		$response = array();
		if (isset($obj['idUser']) && isset($obj['title']) && isset($obj['type'])){
			$idUser = $obj['idUser'];
			$title = $obj['title'];
			$type = $obj['type'];

			if ($type == 'mail'){
				if(!filter_var($title, FILTER_VALIDATE_EMAIL)) {
					$response['mess'] = 'Email address is not valid!';
				} else if(email_exists($title) ) {
					$response['mess'] = 'Email already exists';
				}else{
					$response['mess'] = editUser($idUser, $title, $type) ? 'Your profile updated!' : 'Error';
				}
			}else{
				$response['mess'] = editUser($idUser, $title, $type) ? 'Your profile updated!' : 'Error';
			}
		} else {
			$response['mess'] = 'Any filed is null';
		}

		return $response;
	}
	function getCurrentAvatar($obj) {
		$response = array();
		if (isset($obj['idUser'])){
			$idUser = $obj['idUser'];
			$response['urlAvatar'] = getUrlAvataUser_ByIdUser($idUser);
		} else {
			$response['mess'] = 'avatar not found';
		}
		return $response;
	}
	function getDataSettingUser($obj) {
		$response = array();
		if (isset($obj['idUser'])){
			$idUser = $obj['idUser'];
			$response = getDataUser($idUser);
		} else {
			$response['mess'] = 'id user is null';
		}
		return $response;
	}

	function deleteWeek($obj) {
		$response = array();

		if (isset($obj['idUser']) && isset($obj['date']) && isset($obj['week']) ){
			$idUser = $obj['idUser'];
			$date = $obj['date'];
			$week = $obj['week'];

			$response['mess'] = deleteweekmeal($idUser, $date, $week ) ? 'Y' : 'N';
		}
		return $response;
	}

	function addPostMealCustomProcess($obj) {
		$response = array();

		if (isset($obj['idUser']) && isset($obj['title']) && isset($obj['date']) && isset($obj['buoi'])){
			$idUser = $obj['idUser'];
			$title = $obj['title'];
			$date = $obj['date'];
			$buoi = $obj['buoi'];

			$response['status'] = addPostMealCustom($idUser, $title, $date, $buoi) ? 'Y' : 'N';
		}
		return $response;
	}

	function deleteItemListMeal($obj) {
		$response = array();
		if (isset($obj['idUser']) && isset($obj['idPost']) && isset($obj['date']) && isset($obj['buoi']) ){
			$idUser = $obj['idUser'];
			$idPost = $obj['idPost'];
			$date = $obj['date'];
			$buoi = $obj['buoi'];

			$response['status'] = deleteItemCustomMeal($idUser, $idPost, $date, $buoi) ? 'Y' : 'N';
		}
		return $response;
	}

	function handelGetListPostCustomMeal($obj) {
		$response = array();
		if (isset($obj['idUser']) && isset($obj['date']) && isset($obj['buoi']) ){
			$idUser = $obj['idUser'];
			$date = $obj['date'];
			$buoi = $obj['buoi'];
			$response = getlistpostcustommeal($idUser, $date, $buoi);
		} else {
			$response['mess'] = 'error';
		}
		return $response;
	}

	function addPostmealPlan($obj) {
		$response = array();
		if (isset($obj['idUser']) && isset($obj['title']) && isset($obj['date']) && isset($obj['buoi'])){
			$idUser = $obj['idUser'];
			$title = $obj['title'];
			$date = $obj['date'];
			$buoi = $obj['buoi'];

			$response['mess'] = addPostMealCustom($idUser, $title, $date, $buoi) ? 'Successfull!' : 'Error, please try again!';
		}
		return $response;
	}

	function getListPostMealPlan($obj) {
		$response = array();

		if (isset($obj['idUser']) && isset($obj['date']) && isset($obj['week'])){
			$idUser = $obj['idUser'];
			$date = $obj['date'];
			$week = $obj['week'];
			$response = getlistpostmeal($idUser, $date, $week);
		} else {
			$response['mess'] = 'error';
		}

		return $response;
	}

	function deleteCurrentShop($obj) {
		if (isset($obj['idPost'])){
			$idPost = $obj['idPost'];

			if (deleteItemShop1($idPost)){
				$code['mess'] = 1;
			}
		}
		return $code;
	}

	function handleDeleteAllShop($obj) {
		if (isset($obj['idUser'])){
			$idUser = $obj['idUser'];

			if (deleteallshop($idUser)){
				$code['mess'] = 1;
			}
		}
		return $code;
	}

	function handleclearcheckallShop($obj) {
		if (isset($obj['idUser'])){
			$idUser = $obj['idUser'];

			if (clearcheckallShop($idUser)){
				$return['mess'] = 1;
			}
		}
		return $return;
	}

	function clearCheckedCurrentShop($obj) {
		if (isset($obj['idShop'])){
			$idShop = $obj['idShop'];

			if (clearcheckShop($idShop)){
				$return['mess'] = 1;
			}
		}
		return $return;
	}

	function editShop($obj) {
		$return = array();
		if (isset($obj['idPost']) && isset($obj['title_edit'])){
			$idPost = $obj['idPost'];
			$title_edit = $obj['title_edit'];

			if (editFood($idPost, $title_edit)){
				$return['mess'] = 1;
			}
		}
		return $return;
	}

	function checkeditemshop($obj) {
		$return = array();

		if (isset($obj['idShop']) && isset($obj['idPost'])){
			$idShop = $obj['idShop'];
			$idPost = $obj['idPost'];

			if ($obj['Action'] === 'checkedItemShop') {
				$return['status'] = checkeditemshop2($idShop, $idPost);
			} else if($obj['Action'] === 'unCheckedItemShop') {
				$return['status'] = uncheckeditemshop2($idShop, $idPost);
			}
		}
		return $return;
	}

	function deleteItem($obj) {
		$response = array();
		if (isset($obj['idShop']) && isset($obj['idPost'])){
			$idShop = $obj['idShop'];
			$idPost = $obj['idPost'];
			$response['mess'] = deleteItemShop2($idShop, $idPost) ? 'item had removed!' : 'cant delete item';
		}
		return $response;
	}
	function addFoodNameItem($obj) {
		$response = array();
		if( isset($obj['userId']) && $obj['title'] !== '' ){
			$idUser = $obj['userId'];
			$title = $obj['title'];

			if( $obj['Action'] === 'addFoodNameItem' ){ // add row for col
				if( isset($obj['postTypeID']) && $obj['postTypeID'] !== '' ) {
					$idShop = $obj['postTypeID'];
					$response['mess'] = addPostShopCustom1($idUser, $idShop, $title) ? 'Add food name item Successful!' : 'Error please try again';
				}else{
					$response['mess'] = 'Not found shop!';
				}
			} else if( $obj['Action'] === 'addFoodName') { // add col
				$response['mess'] = addPostShopCustom($idUser, $title) ? 'Add food name Successful!' : 'Error please try again';
			}
		} else {
			$response['mess'] = $obj['title'] === '' ? 'Food name is null!' : 'You are not logged!';
		}
		return $response;
	}

	function actionItemFa($obj) {
		$return = array();
		if ( isset($obj['user_id']) && isset($obj['product_id']) ) {
			if( $obj['Action'] == 'deleteItemFa') {
				$return['mess'] = deleteItemFa($obj['user_id'], $obj['product_id']) ? 'Removed Item' : 'Sorry, An error occurred. Plese try again!';
			}else if($obj['Action'] == 'addItemFa'){
				$return['mess'] = addItemFa($obj['user_id'], $obj['product_id']) ? 'Successful' : 'Sorry, An error occurred. Plese try again!';
			}else if($obj['Action'] == 'checkFav') {
				$return['mess'] = checkFav($obj['user_id'], $obj['product_id']) ? 'inFav' : 'Sorry, An error occurred. Plese try again!';
			}
		}
		return $return;
	}

	function getlistpostshoptab($obj) {
		$return = array();
		if( isset($obj['user_id']) && $obj['user_id'] !== '' ){
			$return = getListShop_tab1($obj['user_id']);
		}
		return $return;
	}

	function getListPostShop() {

		$mess = "";
		if (isset($_POST['idUser'])){
			$idUser = $_POST['idUser'];

			$mess = $idUser.'-'.$date;
			$listPost = getListShop_tab1($idUser);
		}else{
			$listPost = array();
		}
		$response = array();
		array_push($response, array("listpost"=>$listPost, "mess" =>$mess));

	}

	function listPostFavorites($obj) {
		if (isset($obj['USER_ID'])){
			$idUser = $obj['USER_ID'];
			$listPost = getListFavorite_byIdUSer($idUser);
			$listPost = addThumbnalToArrPost($listPost);
		}else{
			$listPost['user'] = 'null roi em ei';
		}
		return 	$listPost;
	}

	function get_list_cat($obj){

		$listPost = array();
		if (isset($obj['cat']) && isset($obj['role']) ){
			$cat = $obj['cat'];
			$role = $obj['role'];
			$listPost = getlistposcat($cat, $role);
			$listPost = addThumbnalToArrPost($listPost);
		} else if( isset($obj['getCatTip']) && $obj['getCatTip'] === true && isset($obj['parentID']) ) {
				$listPost = getlistCatTip($obj['parentID']);
		} else {
			$listPost['mess'] = 'fucking wow shit!';
		}
		return $listPost;
		//$response = array();
		//array_push($response, array("listpost"=>$listPost));
	}

	function get_product($obj) {
		$listPost = array();
		if( isset($obj["ID_POST"]) ) {
			$idPost = $obj["ID_POST"];
			$listPost = getDataPostIOS($idPost);
			$listPost = addThumbnalToArrPostIOS($listPost);
			$listPost = addGalleryToArrPostIOS($listPost);
		}
		return $listPost;
	}

	function listpost($obj){

		$args = array(
			'posts_per_page'   => -1,
			'orderby'          => 'date',
			'order'            => 'DESC',
			'post_type'        => 'post',
			'post_status'      => 'publish',
			'suppress_filters' => true
		);

		if( isset( $obj["ROLE"] ) && $obj["ROLE"] == "userPremium"  ){
			$args = array(
				'posts_per_page'   => -1,
				'orderby'          => 'date',
				'order'            => 'DESC',
				'meta_key'         => 'role',
				'meta_value'       => 'userNormal',
				'post_type'        => 'post',
				'post_status'      => 'publish',
				'suppress_filters' => true
			);
		}

		$posts_array = getlistposthome( $args );
		$posts_array = addThumbnalToArrPost($posts_array);
		return $posts_array;
	}

	function register($obj){
		global $wpdb;
		$result = array();

		$username = $obj["USERNAME"];
		$email	= $obj["EMAIL"];
		$pass	= $obj["PASSWORD"];
		$phone	= $obj["PHONE"];

		if ($username == "" || $pass == "" || $email == ""){
			$mess = "any field not empty";
			$status = 'Failed';
		}else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$mess = 'Email address is not valid!';
			$status = 'Failed';
		} else if(email_exists($email) ) {
			$mess = 'Email already exists';
			$status = 'Failed';
		} else {
			$typeuser = 'userNormal';
			$user_id = wp_insert_user( array ('user_pass' => apply_filters('pre_user_user_pass', $pass), 'user_login' => apply_filters('pre_user_user_login', $username), 'user_email' => apply_filters('pre_user_user_email', $email), 'role' => $typeuser ) );
			if( is_wp_error($user_id)) {
				$mess = 'Error on user creation';
				$status = 'Failed';
			} else {
				do_action('user_register', $user_id);
				update_user_meta($user_id, "phone", $phone);
				$mess = 'Sign Up Success!';
				$status = 'Successful';
			}
		}

		// return
		if ( $status == 'Successful' ) {
			$result = array(
				"username" => $username,
				"messenger" => $mess,
				"status" => $status,
				"id_user" => (string) $user_id,
				"role" => getRoleUser($user_id),
			);
		}else{
			$result = array(
				"messenger" => $mess,
				"status" => $status,
			);
		}
		return $result;
	}

	function login_default($obj){
		$result = array();

		$username = $obj["USERNAME"];
		$pass	= $obj["PASSWORD"];

		if ($username == "" || $pass == ""){
			$mess = "Username and Password not empty";
			$status = "Failed";
		}else{
			if (check_login($username, $pass)){
				$mess = "Login Successful";
				$status = "Successful";
				$idUser = getIdUser($username, $pass);
				$kt = updateRoleUser($idUser);
				if ($kt){
					$role = getRoleUser($idUser);
				}
			}else{
				$mess  = "Wrong Username Or Password!";
				$status = "Failed";
			}
		}
		$result = array(
			"username" => $username,
			"messenger" => $mess,
			"status" => $status,
			"id_user" => $idUser,
			"role" => $role,
		);

		return $result;
	}
?>

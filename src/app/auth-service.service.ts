import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

// const apiUrl = 'http://192.168.2.53:3000/api';
const createTeamUrl = 'http://192.168.2.40:3000/api';

const apiUrl = 'http://192.168.2.40:3000/admin';
// const createTeamUrl = '/api';

@Injectable()
export class AuthServiceService {

  constructor(
  	 private http: Http) {

   }

   /*********************************************Admin STARt******************************************/

     /**********************************LOGIN***************************************/

  AdminLogin(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      email: data.email,
      password: data.password
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + '/login', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  /**********************************USers MAtches***************************************/

  getUserMatches(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + '/get_upcoming_completed_scrimmages', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

    /**********************************Send Promo***************************************/

  sendPromo(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id,
      promo_code:data.code
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + '/send_promo_code', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  /**********************************User Detail***************************************/

  getUserDetail(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + '/get_user_detail', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  /**********************************Suspend Users***************************************/

  doSuspendUser(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id,
      status:'SUS'
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + '/suspend_user', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
    /**********************************Complains/Suggestions Users***************************************/

  getCompailns() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + '/get_complaints_suggestions', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

    /**********************************Delete Sports***************************************/

  deleteSport(id,type) {
    const body = this.StringQuery({
      type_id: id,
      type: type
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + '/delete_list', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

       /**********************************Add Gneder***************************************/

  addGender(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      gender: data.gender
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + '/add_gender', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

     /**********************************Add Age Group***************************************/

  addGroup(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      agegroup: data.agegroup
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + '/add_age_group', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
     /**********************************Add Skills***************************************/

  addSkill(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      skill: data.skill
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + '/add_skill', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
   /**********************************Add Sports***************************************/

  addSport(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      sport: data.sport
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + '/add_sport', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

    /**********************************Get Gender***************************************/

  getGender() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + '/get_genders', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

   /**********************************Get Age Grop***************************************/

  getAge() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + '/get_age_groups', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

    /**********************************Get Skills***************************************/

  getSkills() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + '/get_skills', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

      /**********************************Get Sports***************************************/

  // getSports() {
  //   const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   const options = new RequestOptions({ headers: headers });

  //   return new Promise((resolve, reject) => {
  //     this.http.get(apiUrl + '/get_sports', options)
  //       .subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }


   /**********************************Reported Users***************************************/

  getReportedUsers() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + '/get_reported_users', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

   /**********************************Get Payment History***************************************/

  getPayment() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + '/get_pyament_history', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


 /**********************************Get Users***************************************/

  getUsers() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + '/get_registered_users', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  /**********************************Get Users***************************************/

  getActiveUsers() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + '/get_active_users', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

      /**********************************Terms Conditions**************************************/


    addtermCondition(files) {
    console.log(files);
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    // options.params = val;
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + '/update_terms', files, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

      /**********************************Privacy Policy**************************************/


  //   getTerms() {
  //   const headers = new Headers();
  //   const options = new RequestOptions({ headers: headers });
  //   // options.params = val;
  //   return new Promise((resolve, reject) => {
  //     this.http.get(apiUrl + '/get_terms', options)
  //       .subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }
    /**********************************Privacy Policy**************************************/


    addPrivacy(files) {
    console.log(files);
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    // options.params = val;
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + '/update_privacy', files, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

      /**********************************Privacy Policy**************************************/


  //   getPrivacy() {
  //   const headers = new Headers();
  //   const options = new RequestOptions({ headers: headers });
  //   // options.params = val;
  //   return new Promise((resolve, reject) => {
  //     this.http.get(apiUrl + '/get_privacy', options)
  //       .subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

        /**********************************ADMIN END ***************************************/


        /**********************************SIGNUP***************************************/

  Signup(data,type) {
    console.log('service data', data);
  const body = this.StringQuery({
	first_name:data.first_name,
	last_name:data.last_name,
	email:data.email,
	password:data.password,
	register_type :type,
	social_media_id:data.id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/signup', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


     /**********************************LOGIN***************************************/

  Login(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      email: data.email,
      password: data.password
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/login', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

        /**********************************Accept/Reject Scrimmages***************************************/

  accRejScrimmages(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      request_id: data.id,
      status:data.status
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/accept_reject_scrimmage_request', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
      /**********************************Pending Scrimmages***************************************/

  getPendingScrimmages(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/get_pending_scrimmages', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

     /**********************************Requeted Scrimmages***************************************/

  getRequestedScrimmages(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/get_requested_scrimmages', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

    /**********************************My Scrimmages***************************************/

  getMyScrimmages(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/get_upcoming_completed_scrimmages', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

         /**********************************Feedback***************************************/

  doFeeback(data) 
  {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id,
      first_name:data.first,
      last_name:data.last,
      type:data.type,
      content:data.content
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/add_complaint_suggestion', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


        /**********************************Rating***************************************/

  doRate(data) 
  {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.u_id,
      other_user_id:data.o_id,
      team_id:data.o_t_id,
      scrimmage_id:data.s_id,
      rating:data.rating

    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/add_rating_scrimmage', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

        /**********************************Get ALl Message***************************************/

  getAllMessage(data) 
  {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.u_id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/getConversations', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

         /**********************************Promo Code***************************************/

  addPromoCode(data) 
  {
    // console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id,
      promo_code:data.promo_code
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/enter_promo_code', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
}

       /**********************************Dedlete CArd***************************************/

  deleteCard(data) 
  {
    // console.log('service data', data);
    const body = this.StringQuery({
      card_id: data.id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/delete_card', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
}

     /**********************************Get Subscription staus***************************************/

  getStatus(data) 
  {
    // console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.u_id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/get_subscription_status', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
}


   /**********************************Get Notifications***************************************/

  getNotification(data) 
  {
    // console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.u_id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/get_notifications', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
}

  /**********************************Make Payment Card***************************************/

  makePayment(data) 
  {
    // console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id,
      card_id:data.card
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/do_purchase', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  /**********************************Add Card***************************************/

  getCard(data) 
  {
    // console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/get_cards', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  /**********************************Add Card***************************************/

  addCard(data) 
  {
    // console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id,
      card_number:data.number,
      cvv:data.cvv,
      expiry_date:data.date
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/add_card', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

        /**********************************Notifications Counter***************************************/

  getNotificationCounter(data) 
  {
    // console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.u_id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/get_notification_count', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  
            /**********************************Message Counter***************************************/

  getCounter(data) 
  {
    // console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.u_id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/get_messages_count', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


          /**********************************Block User***************************************/

  BlockUser(data) 
  {
    // console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.u_id,
      connection_id:data.con
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/block_user', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

        /**********************************Delete Message***************************************/

  deleteUserMessage(data) 
  {
    // console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.u_id,
      connection_id:data.con
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/delete_conversation', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
      /**********************************Get Message***************************************/

  getUserMessage(data) 
  {
    // console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.u_id,
      other_user_id:data.o_id,
      connection_id:data.con
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/getSingleConversation', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  /**********************************Report User***************************************/

  doReportUser(data) 
  {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.u_id,
      other_user_id:data.o_id,
      connection_id:data.con
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/report_user', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


      /**********************************Privacy Policy**************************************/


    getTerms() {
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    // options.params = val;
    return new Promise((resolve, reject) => {
      this.http.get(createTeamUrl + '/get_terms', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
      /**********************************Privacy Policy**************************************/


    getPrivacy() {
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    // options.params = val;
    return new Promise((resolve, reject) => {
      this.http.get(createTeamUrl + '/get_privacy', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
      /**********************************Send Message***************************************/

  sendUserMessage(data) 
  {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.u_id,
      other_user_id:data.o_id,
      connection_id:data.con,
       message:data.mess
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/send_message', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

      /**********************************Available Scrimmage***************************************/

  doAvailableScrimmage(data) 
  {
    console.log('service data', data);
    const body = this.StringQuery({
      team_id: data.id,
      available_status:data.status
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/set_team_availability', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

    /**********************************Edit Dates***************************************/

  doeditDates(data) 
  {
    console.log('service data', data);
    const body = this.StringQuery({
      team_id: data.id,
      available_dates:data.arry
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/edit_available_dates', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
    /**********************************Delete Account***************************************/

  deletemyAccount(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/delete_my_account', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  /**********************************Change Password***************************************/

  changePassword(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id,
      old_password: data.oldpass,
      new_password: data.newpass
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/change_password', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  /**********************************Delete Teams***************************************/

  deleteTeams(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      team_id: data.id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/delete_my_team', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

      /**********************************Get Gender***************************************/

  // getGender() {
  //   const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   const options = new RequestOptions({ headers: headers });

  //   return new Promise((resolve, reject) => {
  //     this.http.get(createTeamUrl + '/get_genders', options)
  //       .subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  /**********************************My Teams***************************************/

  getMyTeams(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/get_my_teams', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


       /**********************************Nearby Scrimmages***************************************/

  getSearchScrimmages(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id,
      loc_lat: data.loc_lat,
      loc_lng:data.loc_lng,
      sport:data.sport,
      skill_level:data.skill_level,
      age_group:data.age_group,
      page:data.page
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/search_with_filters', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

       /**********************************Nearby Scrimmages***************************************/

  getNearScrimmages(data) {
    console.log('service data', data);
    const body = this.StringQuery({
      user_id: data.id,
      latitude: data.lat,
      longitude:data.lng
    });
    console.log(body);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/get_nearby_scrimmages', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

    /**********************************Request Scrimmage**************************************/

  doRequestScrimmage(id) 
  {
  console.log("iddddddd",id)
     const body = this.StringQuery({
      user_id: id.id,
      team_id:id.teamid,
      other_user_id:id.uid,
      other_team_id:id.otherteamid,
      date_of_match:id.date,
      from_time:id.from,
      to_time:id.to
    });
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/send_request_scrimmage',body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

    /**********************************Other Team detail***************************************/

  otherMyTeamDetail(id) {
  console.log("iddddddd",id)
     const body = this.StringQuery({
      team_id: id
    });
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/get_other_team_detail',body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  /**********************************My Team detail***************************************/

  getMyTeamDetail(id,idd) {
  console.log("iddddddd",idd)
     const body = this.StringQuery({
      team_id: id,
      user_id:idd
    });
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/get_team_detail',body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

         /**********************************Select Sports***************************************/

  getSports() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(createTeamUrl + '/get_sports', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
       /**********************************Age Group***************************************/

  getAgeGroup() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(createTeamUrl + '/ageGroup', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

         /**********************************Skill Level***************************************/

  getSkillLevel() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(createTeamUrl + '/getskill', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
      /**********************************Create TEAm***************************************/

  editProfile(files) {
    // alert("calledddd")
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    // options.params = val;
    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/edit_profile', files, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

      /**********************************Edit TEAm***************************************/

  editTeam(files) {
    // alert("calledddd")
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    // options.params = val;
    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/edit_team', files, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

    /**********************************Create TEAm***************************************/

  createTeam(files) {
    // alert("calledddd")
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    // options.params = val;
    return new Promise((resolve, reject) => {
      this.http.post(createTeamUrl + '/create_team', files, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }



    public StringQuery(jsonString) {
    return Object.keys(jsonString).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

}

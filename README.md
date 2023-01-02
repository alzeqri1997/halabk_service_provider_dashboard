# Halabk - Service Provider

description about it

<aside>
⚠️ Important Things to Note

</aside>

For more information about how we structure the files, you could go to Wameed Documentation

## Table of Contents

- [Log in](about:blank#log-in)
- [Sign up](about:blank#sign-up)
- [Verify Email](about:blank#verify-email)
- [Forgot Password](about:blank#forgot-password)
- [Dashboard](about:blank#dashboard)
- [Packages](about:blank#packages)
- [Bookings](about:blank#bookings)
- [Financial Operations](about:blank#financial-operations)
- [Profits](about:blank#profits)
- [Chat](about:blank#chat)
- [Coupons](about:blank#coupons)
- [Feedbacks](about:blank#feedbacks)
- [Settings](about:blank#settings)
- Middleware & Others

## Login

This section is where the user logs in. Either he already got an account or he must create a new one. 

## Sign up

In the Signup section, a new user must fill the required fields : 

1. Logo
2. Service Provider Name
3. Service Provider Type
4. Email
5. Password
6. Confirm Password
7. Personal Information
8. legal documents

When the user hits the create a new button, he will be redirected to Verify section

## Verify Email

The user will receive a message in his email that contains a number. That number consists of 5 digits. The user must fill in this number to verify the account in order to move to the next step. 

You will get 3 minutes to fill in this number otherwise you will have to press ***resend*** button to get a fresh number.

### Important Component

- Counter

counts 3 minutes down.

---

## Forgot Password

If you forget your password, It’s Ok you could reset your password again.

1. you receive a message in your email to verify your account.
2. and then. you could change your password again.

---

## Dashboard

This page is the main section. There are four statuses of the profile 

1. **Suspended**: Your application and the documents submitted by you are currently being reviewed by the admin.
2. **Pending**: If the admin gives you permission, you will have to select the interests, select packages, and pay the money for a selected package.
3. **Rejected**: If the admin does not give you permission, that means there is something wrong that you have to fix.
4. **Active**: This type comes after pending which means you have successfully completed all the requirements and you are good to perform your actions.

---

In the **pending** status, there is a multi-step form

1. interests
2. packages
3. payment

In the *payment* step, there is an **<*iframe/>** component* where you pay the money. If you paid successfully, your status will be automatically changed to ***active*** status in 6 seconds and refresh the page as well.

since you can’t control the ***iframe*** tag, you can only listen to the event when changed. 

<aside>
🎯 src/main.js

</aside>

```jsx
window.addEventListener('message', (event) => {
  if (event.data.type === 'payment_success') {
    setTimeout(function () {
      window.location.reload();
    }, 6000);
  }
});
```

### Restrictions of package

There are 3 types of users based on the package he selected:

1. Basic
2. Growth
3. Premium

### Important Components

In the main *dashboard, there are 4 main components.*

- expired-subscription

this component only shows if the package is about to expire ( 7 days or less ) 

the only important *****method* ****is **durationAsDays()**

<aside>
🎯 src/components/pages/dashboard/ExpiredSubscription.vue

</aside>

```jsx
durationAsDays() {
      const current = this.moment().startOf('day');
      const given = this.moment(this.end_date);

      // Difference in number of days

      const totalDays = this.moment(given)
        .startOf('day')
        .diff(this.moment(current).startOf('day'), 'days');

      if (totalDays <= 7) {
        this.willExpire = true;
        if (totalDays === 1) {
          return;
        }
        if (totalDays <= 0) {
          return 0;
        }
        return totalDays;
      }
      this.willExpire = false;

      return totalDays;
    },
```

- h-panels

shows the statistics of  ( expired bookings, current bookings, added packages, profits ) 

- Service-Card

shows the packages 

- feedback

shows the reviews of the users who used specific packages

---

## Packages

### Main page

show the packages the provider added 

### Add Package

is a multi-step form where you fill in the information of the package.

We have used ***form wizard vue.*** For more information, click [here](https://binarcode.github.io/vue-form-wizard/#/)

<aside>
⛔ Note:  the component name is  *FormWizardNumber.vue*

</aside>

this method is used in the second step.

**getNumberOfDates()** is a method to generate a fixed-length array of objects based on the start date and the end date that contains:

1. heading : i.e:- day one, day tow
2. title: today's title
3. from: starting time of the day
4. to: ending time of the day
5. desc: description of the day

on each object.

```jsx
getNumberOfDates(startDate, endDate, steps = 1) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // getDate Range - START
      const dateArray = [];
      const currentDate = new Date(startDate);

      while (currentDate <= new Date(endDate)) {
        dateArray.push(new Date(currentDate).toDateString());
        // Use UTC date to prevent problems with time zones and DST
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
      }
      this.dateRange = dateArray;
      // getDate Range - END
      return Array.from({ length: diffDays + 1 }, () => ({
        heading: 'اليوم ',
        title: '',
        from: null,
        to: null,
        desc: null,
      }));
    }
```

The third step  uses **Form Repeater,** click [here](https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/forms/form-repeater) ( Vuexy )

### Single package details

shows more details of the single package

tow things to focus on : 

- request package cancellation

you can do this only when the package is ongoing ( active ) or upcoming ( soon )

<aside>
🎯 src/views/pages/packages/details

</aside>

```jsx
checkCancelPackage(status) {
      if (this.getPackageDetails) {
        const isSoon = this.getPackageDetails.status === 'soon';
        const isActive = this.getPackageDetails.status === 'active';

        if ((isSoon || isActive) && status === null) {
          return false;
        }
        return true;
      }
    },
```

There are states of the package :

1. active
2. not active
3. soon
4. expired
5. not available

```jsx
checkCancelPackage(status)
```

status parameter: is the state of the package cancellation. if the cancellation status is null ( empty status ) and the current package status is soon or active, that means you can request package cancelation. otherwise, you can not.

---

- request special advertisement

you can do this only when the package status is upcoming ( soon )

<aside>
🎯 src/views/pages/packages/details

</aside>

```jsx
checkOrderSpecial(status, cancelStatus) {
      if (this.getPackageDetails) {
        const isSoon = this.getPackageDetails.status === 'soon';
        if( isSoon && status === null && cancelStatus === null ){
          return false;
        }else{
          return true;
        }
      }
    },
```

This function works exactly like the ***checkCancelPackage*** method ******we mentioned before. However, cancelStatus is added to check whether the provider has already requested a package cancelation or not.

So the logic is going to be like this: **if** (  package status is soon **AND** package special order state is null ( not requested before ) **AND** package cancellation state is null ( not requested before ) ) = you are able to request a special order. Otherwise, you can not.

---

## Bookings

### Main page

show the users who book particular packages

### single bookings details

shows 

1. package information
2. booking information
3. user information 

<aside>
⛔ Important thing(s) to note

</aside>

in the user information section, there is a button that the provider can click to message the user. by the time the provider does that, he will be redirected to the **CHAT** page with the user information. We are going to explain how the provider chats with the users or the admin in more detail later on.

<aside>
🎯 src/components/pages/bookings/UserInfo.vue

</aside>

```jsx
goto('chat') {
      const userInfo = {
        id: this.id.toString(),
        name: this.name,
        avatar: this.image,
      };
      return {
        name: value,
        params: { userInfo },
      };
    },
```

for more information on how to pass values ( parameters ) between routes, click [here](https://stackoverflow.com/questions/50998305/vue-is-there-a-way-to-pass-data-between-routes-without-url-params)

---

## Financial Operations

show the information on financial operations. 

<aside>
⛔ Important thing(s) to note

</aside>

you can download an invoice of the operation using this method

```jsx
downloadReceipt(id) {
      // todo download receipt
      this.$store.commit('loadingStart', null);
      this.$store
        .dispatch('downloadInvoiceReceipt', id)
        .then(res => {
          this.$store.commit('loadingFinish', null);
          window.open(res);
        })
        .catch(err => {
          this.$store.commit('loadingFinish');
        });
    },
```

---

## Profits

shows the packages profits information

---

## Chat

chat with the users and the admin or support.

we have used **vue-advanced-chat**. go to the documentation for more. Click [here](https://github.com/antoine92190/vue-advanced-chat)

<aside>
💬 How does the chat work?

</aside>

for more details of how it works, you could go to **src/views/pages/chats/index.vue** file and see brief comments for each method.

---

## Coupons

shows the coupons of the packages. you can deactivate the coupon when it’s ongoing. 

---

## Reviews ( Feedbacks )

show the users who left a comment for a package.

---

## Settings

consist of 

1. **Company details**
    
    you can edit or change provider details like 
    
    - password
    - name
    - email
    - personal information
    - social media names
    - logo
    - city
    - interests
    
    <aside>
    ⛔ Important thing(s) to note
    
    </aside>
    
    When the provider hits the **save edits** button, things that have been edited will immediately be changed. however. if the provider wants to reset, he can easily hit the **cancel** button. 
    
    ```jsx
    resetChanges() {
          // parse the data that comes from the server
          const updatedContacts = JSON.parse(
            JSON.stringify(this.getBusinessProfileInfo),
          );
          // update the form with the data using $set, 
    			//because vue can not detect the change in the data if 
          // it is an array or object.
          this.$set(this.contacts, 'contacts', updatedContacts.contacts);
        },
    ```
    

1. **package details**

In this section, you can upgrade, downgrade, or renew your package.

There are there three package subscriptions 

- Basic
- Growth
- Premium

and It can be either of these

- monthly
- annually

<aside>
⛔ Important thing(s) to note

</aside>

The server gives you two values to determine what package is selected by the provider. 

By having these two values, you could manipulate the options and apply some restrictions. 

<aside>
⚠️ Important methods

</aside>

```jsx
checkPackageLevel(price)
```

This method determines the level of the package in order to make some restrictions.

more information on how it works will be in the code **src/components/pages/setting/subscription/subscribtionCard.vue**

---

## Middleware & Others

we have added some restrictions based on the package type 

package types are :

- Basic
- Growth
- Premium

first, we added the middle 

```jsx
export default function middlewareAccountState({ to, next }) {
  const loginData = Vue.$cookies.get('login-data', { parseJSON: true });
  // the only routes that are allowed to be accessed without active account
  const rejectRoute = ['dashboard', 'edit-profile'];
  // this is the the route that the account of all types can access.
  const routeName = 'dashboard';
  if (loginData) {
    // first, check if the user is logged in.
    // then , check if data is fetched from the server.
    if (store.getters.getProfileInfo) {
      // third, check if the provider is active. 
      if (store.getters.getProfileInfo.complete_status !== 'active') {
        // if not active, that means the user would be 
        // rejected, suspended, or pending.
        // we will show the provider only the dashboard page.
        // so we have to close the all other features of the provider account until the account is active.

        // now, let's check if the provider is rejected or not.
        if (
          (store.getters.getProfileInfo.complete_status !== 'rejected' &&
            to.name !== routeName) ||
          (store.getters.getProfileInfo.complete_status === 'rejected' &&
            !rejectRoute.includes(to.name))
        ) {
          // if the provider account is not rejected, AND the route name is not the same as routeName variable which is 'dashboard',
          // OR
          // if the provider account is rejected, AND the route name is one of the rejectRoute variable which is ['dashboard', 'edit-profile'],
          // then we will redirect the user to the dashboard page.
          return next({ name: routeName, params: { lang: to.params.lang } });
        } else {
          // otherwise, we will let the user to access the page he wants.
          return next();
        }
      } else {
        // If the provider is active, 
        // we should add some restrictions to the routes based on the package type ( Basic, Growth, or Premium )
        // if the package type is Basic, we should not allow the user to access the Dashboard and reports pages.
        // the other package types should be allowed to access the Dashboard and reports pages.

        const [reports] = store.getters.getProfileInfo.restrictions.filter(
          (item) => item.name === 'reports'
        )
        const [dashboard] = store.getters.getProfileInfo.restrictions.filter(
          (item) => item.name === 'dashboard'
        )
        // the reports and dashboard variables contains a key called 'code'.
        // if the code is 'xx_xx_01', that means the provider is not allowed to access that page.
        // if the code is 'xx_xx_00', that means the provider is allowed to access that page.
        // so the logic is:
        // if the the provider is not allowed to access the reports page or the dashboard page,
        // AND
        // if the route name is the dashboard or the reports,
        // the provider should be redirected to the package page because he is not allowed to access them.
        if ((reports.code === '02_06_01' || dashboard.code === '02_07_01') && (to.name === 'dashboard' || to.name === 'financial-operations')) {
          return next({ name: 'packages', params: { lang: to.params.lang } });
        } else {
          // otherwise, the provider is allowed to access the reports page or the dashboard page.
          return next();
        }
      }
    }
    return next();
  }
  return next({ name: 'login', params: { lang: to.params.lang } });
}
```

However, we also added some restrictions on the dashboard page & the sidebar

in dashboard.
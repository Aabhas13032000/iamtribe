import React from 'react';
import Account from '../../components/Account/Account';
import ProfileForm from '../../components/ProfileForm/ProfileForm';

function ProfilePage(props) {

    // console.log(props.user);

    return <div>
        {
            props.user.role_id === 2 ? props.user.bio === null || props.user.gender === null || props.user.skills === null ? <ProfileForm user={props.user} backendurl={props.backendurl}></ProfileForm> : <Account user={props.user} backendurl={props.backendurl}></Account> : <h1>Become a photographer</h1>
        }
    </div>;
}

export default ProfilePage;
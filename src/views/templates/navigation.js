import home from '../../img/icons/home.svg';
import profile from '../../img/icons/profile.svg';

export default `

<div class="navigation">
    <a href="{{classData.home.href}}" class="home {{classData.home.active}}"><img src="${home}" alt="home"></a>
    <a href="{{classData.profile.href}}" class="profile {{classData.profile.active}}"><img src="${profile}" alt="profile"></a>
</div>
`;

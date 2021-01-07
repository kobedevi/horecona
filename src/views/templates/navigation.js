import home from '../../img/icons/home.svg';
import profile from '../../img/icons/profile.svg';

export default `

<div class="o-navigation">
    <a href="{{classData.home.href}}" class="home a-navigation__link {{classData.home.active}}"><img class="a-navigation__icon" src="${home}" alt="home"></a>
    <a href="{{classData.profile.href}}" class="profile a-navigation__link {{classData.profile.active}}"><img class="a-navigation__icon" src="${profile}" alt="profile"></a>
</div>
`;

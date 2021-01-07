export default `
    <div class="m-history-item m-button__action">
        <div class="m-history__data">
            <p>{{place}}</p>
            <p class="a-data__date">{{date}}</p>
        </div>
        {{#if active}}
            <span class="a-action__span">Active</span>
        {{/if}}
    </div>
`;

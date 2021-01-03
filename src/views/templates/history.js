export default `
    <div class="history-item action">
        <div class="history-data">
            <p>{{place}}</p>
            <p class="date">{{date}}</p>
        </div>
        {{#if active}}
            <span>Active</span>
        {{/if}}
    </div>
`;

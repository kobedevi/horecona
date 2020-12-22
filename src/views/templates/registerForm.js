export default `

    <div class="error-container hide"></div>
    <div class='together'>
        <input type="email" name="email" id="email" placeholder="Fons.makker@gmail.com">
        <label for="email">E-mail address <span>*</span></label>
    </div>
    <div class='together'>
        <input type="password" name="password" id="password" placeholder="••••••••">
        <label for="password">Password <span>*</span></label>
    </div>
    <div class='together'>
        <input type="password" name="repeat-password" id="repeat-password" placeholder="••••••••">
        <label for="repeat-password">Repeat password <span>*</span></label>
    </div>
    <section>
        <br/>
        <label>Account type:</label><br/><br/>
        <label class="container">User
            <input type="radio" checked="checked" value="user" name="type">
            <span class="checkmark"></span>
        </label>
        <label class="container">Business
            <input type="radio" value="Business" name="type">
            <span class="checkmark"></span>
        </label>
    </section>
    <br/>
`;


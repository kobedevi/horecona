export default `

    <div class="m-form__error-container hide"></div>
    <div class='together'>
        <input type="number" name="maximumCapacity" id="maximumCapacity" placeholder="20" min="1" required>
        <label for="maximumCapacity">Maximum capacity<span>*</span></label>
    </div>
    <div class='together'>
        <input type="text" name="firstName" id="firstName" placeholder="Fons" required>
        <label for="firstName">First name manager<span>*</span></label>
    </div>
    <div class='together'>
        <input type="text" name="surname" id="surname" placeholder="de Spons" required>
        <label for="surname">Surname manager<span>*</span></label>
    </div>
    <div class='together'>
        <input type="date" name="dateOfBirth" id="dateOfBirth" placeholder="01/01/1970" required>
        <label for="dateOfBirth">Date of birth<span>*</span></label>
    </div>
    <div class='together'>
        <input type="tel" name="phone" id="phone" placeholder="+32 123 45 67 89" required>
        <label for="phone">Phone number<span>*</span></label>
    </div>
    <br/>
`;

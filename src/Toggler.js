import styled from "styled-components";
import { useContext } from "react";
import ThemeContext from "./ThemeContext";

const StyledLabel = styled.label`
    input {
    position: fixed;
    left: -999999px;
} 

input ~ div {
    width: 50px; /* antes 50px */
    height: 26px; /* antes 26px */
    background: #eee;
    border-radius: 20px; /* antes 20px */
    position: relative;
}

svg {
    height: 26px; /* antes 26px */
    color: #fff;
    background-color: #ccc;
    border-radius: 11px; /* antes 11px */
    position: absolute;
    top: 0px;
    left: 0.5px; /* antes 0.5px */
    transition: all 0.4s ease;
}

input:checked ~ div {
    background: #668;
}

input:checked ~ div svg {
    background-color: #224;
    left: 26px; /* antes 26px */
}

`;

function Toggler(){
    const theme = useContext(ThemeContext);
    return (
        <StyledLabel>
            <input type="checkbox" checked={theme.darkMode} 
            onChange={() => theme.setDarkMode(oldValue => !oldValue)}/>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
            </div>
        </StyledLabel>
    )
}

export default Toggler;
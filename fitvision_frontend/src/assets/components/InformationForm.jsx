import { useState } from "react";
import {useNavigate} from "react-router-dom";
import CoachDialog from "./CoachDialog";
import FlowSteps from "./FlowSteps";
import FieldError from "./FieldError";
import PixelIcon from "./PixelIcon";
import { arrowRightIcon, lockIcon } from "./pixelIcons";

const inputClass =
    "w-full rounded-xl border-2 border-brand/40 bg-canvas py-3 pr-4 pl-14 text-xl text-gray-900 placeholder:text-gray-500 transition-colors focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/20 focus:outline-none";

// Added on top of inputClass when that field has an error.
const inputErrorClass = "border-brand bg-brand/5";

function InformationForm() {

    const [email,setEmail] = useState(() => readSavedUser().email ?? "");
    const [username,setUserName] = useState(() => readSavedUser().username ?? "");
    const navigate = useNavigate();
    const [error, setErrors] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const emailInput = form.elements.emailInput;
        const newErrors = {};
        if (username.trim() === "") {
            newErrors.username = "Tell us your name champ";
        }
        if (email.trim() === "") {
            newErrors.email = "We need your email champ";
        } else if (emailInput.validity.typeMismatch) {
            newErrors.email = "Please enter a valid email address";
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            if (newErrors.username) form.elements.usernameInput.focus();
            else emailInput.focus();
            return;
        }
        console.log("Username: ",username);
        console.log("Email: ",email);
        localStorage.setItem("createUserData",JSON.stringify({username,email}));
        navigate("/secondPageForm");
    }

    return (
        <main className="mx-auto max-w-5xl px-4 py-8 md:py-12">
            <FlowSteps current={1} />

            <div className="mt-8 grid items-center gap-8 md:mt-12 md:grid-cols-2 md:gap-12">
                <CoachDialog title="Tell us about you, champ!">
                    And let your fitness journey begin!
                </CoachDialog>

                {/* noValidate turns off the browser's own popups, so only our messages show. */}
                <form noValidate onSubmit={handleFormSubmit} className="rounded-2xl border-2 border-brand bg-white p-6 shadow-[6px_6px_0_var(--color-ink)] md:p-8">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="usernameInput" className="text-2xl font-bold text-gray-900">Name</label>
                            <div className="relative mt-2">
                                <img src="/person.png" alt="" className="pointer-events-none absolute top-1/2 left-4 size-7 -translate-y-1/2" />
                                <input required={true} id="usernameInput" className={`${inputClass} ${error.username ? inputErrorClass : ""}`} type="text" autoComplete="name" placeholder="Enter your name" value={username} onChange={(e)=> {setUserName(e.target.value); setErrors(prev => ({ ...prev, username: undefined})); }} aria-invalid={error.username ? true : undefined} aria-describedby={error.username ? "usernameError" : undefined} />
                            </div>
                            <FieldError id="usernameError">{error.username}</FieldError>
                        </div>
                        <div>
                            <label htmlFor="emailInput" className="text-2xl font-bold text-gray-900">Email</label>
                            <div className="relative mt-2">
                                <img src="/icons/email.png" alt="" className="pointer-events-none absolute top-1/2 left-4 w-8 -translate-y-1/2" />
                                <input required={true} id="emailInput" className={`${inputClass} ${error.email ? inputErrorClass : ""}`} type="email" autoComplete="email" placeholder="Enter your email" value={email} onChange={(e)=> { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined}));}} aria-invalid={error.email ? true : undefined} aria-describedby={error.email ? "emailError" : undefined} />
                            </div>
                            <FieldError id="emailError">{error.email}</FieldError>
                        </div>
                    </div>
                    <p className="mt-5 flex items-center gap-2 text-lg text-gray-600">
                        <PixelIcon rows={lockIcon} className="size-5 shrink-0 text-ink" />
                        All your information is private.
                    </p>

                    <button
                        type="submit"
                        className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-ink bg-brand px-6 py-4 text-2xl text-white shadow-[4px_4px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-ink)]"
                    >
                        Next
                        <PixelIcon rows={arrowRightIcon} className="size-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </form>
            </div>
        </main>
    );
}

export default InformationForm;

function readSavedUser() {
    try {
        return JSON.parse(localStorage.getItem("createUserData")) ?? {};
    } catch {
        return {};
    }
}

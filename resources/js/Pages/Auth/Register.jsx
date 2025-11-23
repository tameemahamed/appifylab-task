import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        profile_picture: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Full-width, template-based layout matching register.html */}
            <section className="_social_registration_wrapper _layout_main_wrapper" style={{ width: '100%' }}>
                <div className="_shape_one">
                    <img src="/assets/images/shape1.svg" alt="" className="_shape_img" />
                    <img src="/assets/images/dark_shape.svg" alt="" className="_dark_shape" />
                </div>
                <div className="_shape_two">
                    <img src="/assets/images/shape2.svg" alt="" className="_shape_img" />
                    <img src="/assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
                </div>
                <div className="_shape_three">
                    <img src="/assets/images/shape3.svg" alt="" className="_shape_img" />
                    <img src="/assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
                </div>

                <div className="_social_registration_wrap">
                    <div className="container-fluid px-5">
                        <div className="row gx-5 align-items-center">
                            {/* Left illustration */}
                            <div className="col-12 col-md-7">
                                <div className="_social_registration_right">
                                    <div className="_social_registration_right_image">
                                        <img src="/assets/images/registration.png" alt="Registration" className="img-fluid" />
                                    </div>
                                    <div className="_social_registration_right_image_dark d-none">
                                        <img src="/assets/images/registration1.png" alt="Registration dark" className="img-fluid" />
                                    </div>
                                </div>
                            </div>

                            {/* Right form */}
                            <div className="col-12 col-md-5">
                                <div className="_social_registration_content">
                                    <div className="_social_registration_right_logo _mar_b28">
                                        <img src="/assets/images/logo.svg" alt="Logo" className="_right_logo" />
                                    </div>

                                    <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
                                    <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>

                                    <button type="button" className="_social_registration_content_btn _mar_b40">
                                        <img src="/assets/images/google.svg" alt="Google" className="_google_img" /> <span>Register with google</span>
                                    </button>

                                    <div className="_social_registration_content_bottom_txt _mar_b40">
                                        <span>Or</span>
                                    </div>

                                    <form className="_social_registration_form" onSubmit={submit} encType="multipart/form-data">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="_social_registration_form_input _mar_b14">
                                                    <InputLabel htmlFor="first_name" value="First Name" />
                                                    <TextInput
                                                        id="first_name"
                                                        name="first_name"
                                                        value={data.first_name}
                                                        className="mt-1 block w-100 _social_registration_input"
                                                        autoComplete="given-name"
                                                        isFocused={true}
                                                        onChange={(e) => setData('first_name', e.target.value)}
                                                        required
                                                        style={{ backgroundColor: '#ffffff', color: '#111827' }}
                                                    />
                                                    <InputError message={errors.first_name} className="mt-2" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="_social_registration_form_input _mar_b14">
                                                    <InputLabel htmlFor="last_name" value="Last Name" />
                                                    <TextInput
                                                        id="last_name"
                                                        name="last_name"
                                                        value={data.last_name}
                                                        className="mt-1 block w-100 _social_registration_input"
                                                        autoComplete="family-name"
                                                        onChange={(e) => setData('last_name', e.target.value)}
                                                        required
                                                        style={{ backgroundColor: '#ffffff', color: '#111827' }}
                                                    />
                                                    <InputError message={errors.last_name} className="mt-2" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="_social_registration_form_input _mar_b14">
                                                    <InputLabel htmlFor="email" value="Email" />
                                                    <TextInput
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        value={data.email}
                                                        className="mt-1 block w-100 _social_registration_input"
                                                        autoComplete="username"
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        required
                                                        style={{ backgroundColor: '#ffffff', color: '#111827' }}
                                                    />
                                                    <InputError message={errors.email} className="mt-2" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="_social_registration_form_input _mar_b14">
                                                    <InputLabel htmlFor="password" value="Password" />
                                                    <TextInput
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        value={data.password}
                                                        className="mt-1 block w-100 _social_registration_input"
                                                        autoComplete="new-password"
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        required
                                                        style={{ backgroundColor: '#ffffff', color: '#111827' }}
                                                    />
                                                    <InputError message={errors.password} className="mt-2" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="_social_registration_form_input _mar_b14">
                                                    <InputLabel htmlFor="password_confirmation" value="Repeat Password" />
                                                    <TextInput
                                                        id="password_confirmation"
                                                        type="password"
                                                        name="password_confirmation"
                                                        value={data.password_confirmation}
                                                        className="mt-1 block w-100 _social_registration_input"
                                                        autoComplete="new-password"
                                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                                        required
                                                        style={{ backgroundColor: '#ffffff', color: '#111827' }}
                                                    />
                                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="_social_registration_form_input _mar_b14">
                                                    <InputLabel htmlFor="profile_picture" value="Profile Picture (optional)" />
                                                    <input
                                                        id="profile_picture"
                                                        name="profile_picture"
                                                        type="file"
                                                        accept="image/*"
                                                        className="mt-1 block w-100"
                                                        onChange={(e) => setData('profile_picture', e.target.files[0] ?? null)}
                                                    />
                                                    <InputError message={errors.profile_picture} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <div className="_social_registration_form_check">
                                                    <label className="_social_registration_form_check_label">
                                                        <input
                                                            type="checkbox"
                                                            className="me-2"
                                                            checked // keep checked by default to match original html behavior
                                                            readOnly
                                                        />
                                                        I agree to terms &amp; conditions
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                                                    <PrimaryButton
                                                        className="w-100 _social_registration_form_btn_link _btn1"
                                                        disabled={processing}
                                                        style={{
                                                            backgroundColor: '#0d6efd',
                                                            borderColor: '#0d6efd',
                                                            color: '#ffffff',
                                                        }}
                                                    >
                                                        Register
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="_social_registration_bottom_txt">
                                                <p className="_social_registration_bottom_txt_para">
                                                    Already registered? <Link href={route('login')}>Login</Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

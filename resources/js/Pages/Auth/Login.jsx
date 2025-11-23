import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* full width wrapper + wider columns */}
            <section className="_social_login_wrapper _layout_main_wrapper" style={{ width: '100%' }}>
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

                <div className="_social_login_wrap">
                    {/* use container-fluid so layout can be full-bleed */}
                    <div className="container-fluid px-5">
                        {/* add some horizontal gutter and allow the image to take more space */}
                        <div className="row gx-5 align-items-center">
                            {/* left illustration: wider on large screens */}
                            <div className="col-12 col-md-7">
                                <div className="_social_login_left">
                                    <div className="_social_login_left_image">
                                        <img src="/assets/images/login.png" alt="Login Illustration" className="_left_img img-fluid" />
                                    </div>
                                </div>
                            </div>

                            {/* right form: wider column */}
                            <div className="col-12 col-md-5">
                                <div className="_social_login_content">
                                    <div className="_social_login_left_logo _mar_b28">
                                        <img src="/assets/images/logo.svg" alt="Logo" className="_left_logo" />
                                    </div>

                                    {status && (
                                        <div className="mb-4 text-sm font-medium text-green-600">
                                            {status}
                                        </div>
                                    )}

                                    <p className="_social_login_content_para _mar_b8">Welcome back</p>
                                    <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>

                                    <button type="button" className="_social_login_content_btn _mar_b40">
                                        <img src="/assets/images/google.svg" alt="Google" className="_google_img" />
                                        <span>Or sign-in with google</span>
                                    </button>

                                    <div className="_social_login_content_bottom_txt _mar_b40">
                                        <span>Or</span>
                                    </div>

                                    <form className="_social_login_form" onSubmit={submit}>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="_social_login_form_input _mar_b14">
                                                    <InputLabel htmlFor="email" value="Email" style={{ color: '#111827' }}/>
                                                    <TextInput
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        value={data.email}
                                                        className="mt-1 block w-100 _social_login_input"
                                                        autoComplete="username"
                                                        isFocused={true}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        // enforce white background + readable text
                                                        style={{ backgroundColor: '#ffffff', color: '#111827' }}
                                                    />
                                                    <InputError message={errors.email} className="mt-2" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="_social_login_form_input _mar_b14">
                                                    <InputLabel htmlFor="password" value="Password" style={{ color: '#111827' }}/>
                                                    <TextInput
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        value={data.password}
                                                        className="mt-1 block w-100 _social_login_input"
                                                        autoComplete="current-password"
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        style={{ backgroundColor: '#ffffff', color: '#111827' }}
                                                    />
                                                    <InputError message={errors.password} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row align-items-center">
                                            <div className="col-sm-6">
                                                <div className="form-check _social_login_form_check">
                                                    <label className="_social_login_form_check_label d-flex align-items-center" htmlFor="remember">
                                                        <Checkbox
                                                            id="remember"
                                                            name="remember"
                                                            checked={data.remember}
                                                            onChange={(e) => setData('remember', e.target.checked)}
                                                        />
                                                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                                                    </label>
                                                </div>
                                            </div>

                                            
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <div className="_social_login_form_btn _mar_t40 _mar_b60">
                                                    <PrimaryButton
                                                        className="w-100 _social_login_form_btn_link _btn1"
                                                        disabled={processing}
                                                        // blue background + white text
                                                        style={{
                                                            backgroundColor: '#0d6efd',
                                                            borderColor: '#0d6efd',
                                                            color: '#ffffff',
                                                        }}
                                                    >
                                                        Log in
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="_social_login_bottom_txt">
                                                <p className="_social_login_bottom_txt_para">
                                                    Dont have an account? <a href="/register">Create New Account</a>
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

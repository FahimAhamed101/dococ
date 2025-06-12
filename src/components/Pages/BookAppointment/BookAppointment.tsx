"use client";
import aboutBg from "@/assets/about/aboutbg.png";
import MainContainer from "@/components/Shared/MainContainer/MainContainer";
import CustomBreadcrumb from "@/components/UI/CustomBreadcrumb";
import CustomDatePicker from "@/components/UI/CustomDatePicker";
import CustomInput from "@/components/UI/CustomInput";
import CustomLoadingButton from "@/components/UI/CustomLoadingButton";
import { ClockCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { Form, Radio, TimePicker, message } from "antd";
import circle from "@/assets/circle.svg";
import Image from "next/image";
import { useBookAppointmentMutation } from "@/redux/features/auth/appontmentApi";
import dayjs, { Dayjs } from "dayjs";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  preferredTime: Dayjs;
  preferredDate: Dayjs;
  reasonForVisit: 'Old Patient Visit' | 'New Patient Visit' | 'Specific Concern' | 'other';
  department: string;
  bodyPart: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

// Breadcrumb items
const breadcrumbItems = [
  {
    href: "/",
    title: (
      <div className="flex gap-2">
        <HomeOutlined />
        <span>Home</span>
      </div>
    ),
  },
  {
    title: "Appointment Form",
  },
];

const departmentOptions = [
  { label: "Pediatric", value: "pediatric" },
  { label: "General Surgery", value: "generalSurgery" },
  { label: "Ophthalmology", value: "ophthalmology" },
  { label: "Dentistry", value: "dentistry" },
];

const visitReasons = [
  { label: "Old Patient Visit", value: "Old Patient Visit" },
  { label: "New Patient Visit", value: "New Patient Visit" },
  { label: "Specific Concern", value: "Specific Concern" },
];

const bodyParts = [
  { label: "Stomach", value: "stomach" },
  { label: "Ears", value: "ears" },
  { label: "Eyes", value: "eyes" },
  { label: "Leg", value: "leg" },
];

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const BookAppointment = () => {
  const [form] = Form.useForm<FormValues>();
  const [bookAppointment, { isLoading }] = useBookAppointmentMutation();

  const onFinish = async (values: FormValues) => {
    try {
      // Format the data to match the API requirements
      const appointmentData = {
        patientName: values.name,
        patientEmail: values.email,
        patientPhone: `+880${values.phone}`, // Assuming Bangladesh country code
        patientAge: values.age,
        patientGender: values.gender,
        patientAddress: values.address,
        visitType: values.reasonForVisit,
        department: values.department,
        bodyPart: values.bodyPart,
        date: values.preferredDate.format('YYYY-MM-DD'),
        timeSlot: values.preferredTime.format('h:mm A'),
      };

      const response = await bookAppointment(appointmentData).unwrap();
      
      if (response.success) {
        message.success('Appointment booked successfully!');
        form.resetFields();
      } else {
        message.error(response.message || 'Failed to book appointment');
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message.error(error.data?.message || 'Failed to book appointment');
      console.error('Appointment booking error:', err);
    }
  };

  const renderRadioOptions = (options: { label: string; value: string }[]) =>
    options.map((option) => (
      <Radio key={option.value} value={option.value} className="text-lg">
        {option.label}
      </Radio>
    ));

  return (
    <section className="w-full px-5 py-10 bg-[#EFF8FE]">
      <MainContainer>
        {/* Breadcrumb */}
        <CustomBreadcrumb items={breadcrumbItems} />

        <div className="w-full max-w-7xl mx-auto mt-10">
          <div className="flex justify-end">
            <Image
              src={circle}
              alt="circle"
              width={150}
              height={250}
              style={{ objectFit: "cover" }}
            />
          </div>
         
          <h1 className="text-3xl font-semibold mb-8">Book Appointment</h1>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="w-full"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 place-items-center place-content-center mb-5">
              <div className="w-full grid grid-cols-2 gap-2">
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <CustomInput placeholder="Enter Your Name" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <CustomInput placeholder="Enter Your Email" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    }
                  ]}
                  className="w-full col-span-full"
                >
                  <CustomInput 
                    type="tel" 
                    placeholder="Enter Your Phone" 
                    addonBefore="+880"
                  />
                </Form.Item>

                <Form.Item
                  name="age"
                  label="Age"
                  rules={[
                    { required: true, message: "Please input your age!" },
               
                  ]}
                >
                  <CustomInput type="number" placeholder="Enter Your Age" />
                </Form.Item>

                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[
                    { required: true, message: "Please select your gender!" },
                  ]}
                >
                  <Radio.Group className="flex flex-wrap gap-4">
                    {renderRadioOptions(genderOptions)}
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                  className="w-full col-span-full"
                >
                  <CustomInput placeholder="Enter Your Address" />
                </Form.Item>

                <Form.Item
                  name="preferredTime"
                  label={<span className="text-lg">Preferred Time</span>}
                  rules={[{ required: true, message: "Please select a time" }]}
                >
                  <TimePicker
                    placeholder="--:-- --"
                    className="w-full border border-[#77C4FE] px-4 py-2 text-[16px] bg-[#F1F9FF] text-gray-700 rounded-lg focus:border-[#77C4FE]"
                    format="h:mm A"
                    minuteStep={30}
                    use12Hours={true}
                    suffixIcon={
                      <ClockCircleOutlined style={{ color: "#77C4FE" }} />
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="preferredDate"
                  label={<span className="text-lg bg-[#F1F9FF]">Preferred Date</span>}
                  rules={[{ required: true, message: "Please select a date" }]}
                >
                  <CustomDatePicker 
                    className="bg-[#F1F9FF]" 
                    disabledDate={(current: Dayjs) => current && current < dayjs().startOf('day')}
                  />
                </Form.Item>

                <Form.Item
                  name="reasonForVisit"
                  label={<span className="text-lg">Reason for Visit</span>}
                  rules={[{ required: true, message: "Please select Reason" }]}
                  className="w-full col-span-full"
                >
                  <Radio.Group className="flex flex-wrap gap-4">
                    {renderRadioOptions(visitReasons)}
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="department"
                  label={<span className="text-lg">Department</span>}
                  rules={[
                    { required: true, message: "Please select Department" },
                  ]}
                  className="w-full col-span-full"
                >
                  <Radio.Group className="flex flex-wrap gap-4">
                    {renderRadioOptions(departmentOptions)}
                  </Radio.Group>
                </Form.Item>
              </div>
              <div
                className="w-full relative h-full flex justify-center items-center bg-cover bg-center order-1 md:order-2"
                style={{ backgroundImage: `url(${aboutBg.src})` }}
              > 
                <div className="absolute bottom-[59px] left-[117px]">
                  <Image
                    src={circle}
                    alt="circle"
                    width={80}
                    height={80}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <h1 className="text-2xl">Contact Info</h1>
                    <div className="border-b border-gray-900 my-3" />
                  </div>
                  <div>
                    <p className="text-gray-900 text-xl">Phone</p>
                    <p className="text-gray-600">+1 123 456 7890</p>
                  </div>
                  <div>
                    <p className="text-gray-900 text-xl">Email</p>
                    <p className="text-gray-600">doctor@example.com</p>
                  </div>
                  <div>
                    <p className="text-gray-900 text-xl">Address</p>
                    <p className="text-gray-600">
                      123 Main St, City, State, Zip
                    </p>
                  </div>
                </div> 
              </div>
            </div>
            
            <Form.Item
              name="bodyPart"
              label={<span className="text-lg">Part of Body</span>}
              rules={[
                {
                  required: true,
                  message: "Please select at least 1 Body part",
                },
              ]}
            >
              <Radio.Group className="flex flex-wrap gap-4">
                {renderRadioOptions(bodyParts)}
              </Radio.Group>
            </Form.Item>
            
            {/* Submit Button */}
            <Form.Item className="w-full md:w-[30%] mt-10">
              <CustomLoadingButton 
                className="bg-sky-300" 
                border={false}
                loading={isLoading}
               
              >
                Book Appointment
              </CustomLoadingButton>
            </Form.Item>
          </Form>
        </div>
      </MainContainer>
    </section>
  );
};

export default BookAppointment;
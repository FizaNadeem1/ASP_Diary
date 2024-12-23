import * as React from 'react';

import { Input, Modal, Form, Select, Checkbox, DatePicker, Row, Col } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import { GetProvinces } from '../../../services/lawyer/dto/getProvinceOutput';
import { GetCities } from '../../../services/lawyer/dto/getCityOutput';
import { GetDivisions } from '../../../services/lawyer/dto/getDivisionOutput';
import { GetTehsils } from '../../../services/lawyer/dto/getTehsilOutput';
import { GetSpecialities } from '../../../services/lawyer/dto/getSpecialityOutput';
import { GetBranches } from '../../../services/lawyer/dto/getBranchOutput';
import LawyerStore from '../../../stores/lawyerStore';
import rules from './createOrUpdateLawyer.validation';
import DisplayImage from '../../../components/DisplayImage/DisplayImage';

interface State {
  confirmDirty: boolean,
  image: File | null; // Image can be a File or null
  // storedImage: string | null; // Stored image is a string (base64) or null
}

export interface ICreateOrUpdateLawyerProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  provinces: GetProvinces[];
  cities: GetCities[];
  divisions: GetDivisions[];
  tehsils: GetTehsils[];
  speciality: GetSpecialities[];
  branches: GetBranches[];
//   selectedCity:string
// selectedDivision:string
// selectedProvince:string
store:LawyerStore
}

class CreateOrUpdateLawyer extends React.Component<ICreateOrUpdateLawyerProps,State> {
  
  state = {
    confirmDirty: false,
    image: null, // To store the image data
    // storedImage: null, // To store the image from IndexedDB
  };

  // Initialize IndexedDB
//   initDB = () => {
//     const request = window.indexedDB.open('ImageDatabase', 1);

//     request.onupgradeneeded = (event) => {
//       const db = (event.target as IDBOpenDBRequest).result;
//       if (!db.objectStoreNames.contains('images')) {
//         db.createObjectStore('images', { autoIncrement: true });
//       }
//     };

//     request.onerror = (event) => {
//       console.error('Database error:', (event.target as IDBOpenDBRequest).error);
//     };

//     request.onsuccess = (event) => {
//       console.log('Database initialized successfully');
//     };
//   };
// // Image upload using IndexedDB (for client-side storage)

// saveImage = (imageFile: File) => {
//   const fileReader = new FileReader();

//   // Read the file as a base64 string
//   fileReader.onloadend = () => {
//     const imageData = fileReader.result; // Base64 image data

//     // Open IndexedDB after the file is read
//     const request = window.indexedDB.open('ImageDatabase', 1);

//     request.onsuccess = (event) => {
//       const db = (event.target as IDBOpenDBRequest).result;
//       const transaction = db.transaction('images', 'readwrite');
//       const store = transaction.objectStore('images');

//       // Save the image data to IndexedDB
//       if (imageData) {
//         store.put(imageData);
//         console.log('Image saved in IndexedDB');
//       }
//     };

//     request.onerror = (event) => {
//       console.error('Error saving image to IndexedDB:', (event.target as IDBOpenDBRequest).error);
//     };
//   };

//   fileReader.readAsDataURL(imageFile); // Start reading the file
// };


//   // Retrieve image from IndexedDB
//   retrieveImage = () => {
//     const request = window.indexedDB.open('ImageDatabase', 1);

//     request.onsuccess = (event) => {
//       const db = (event.target as IDBOpenDBRequest).result;
//       const transaction = db.transaction('images', 'readonly');
//       const store = transaction.objectStore('images');
//       const getRequest = store.get(1); // Retrieve the first stored image

//       getRequest.onsuccess = () => {
//         const imageData = getRequest.result;
//         if (imageData) {
//           this.setState({ storedImage: imageData });
//           console.log('Image retrieved from IndexedDB');
//         }
//       };

//       getRequest.onerror = (event) => {
//         console.error('Error retrieving image:', (event.target as IDBRequest).error);
//       };
//     };
//   };


//     // Handle image selection
//     handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const input = e.target as HTMLInputElement;
//       const file = input.files?.[0]; // Get the first selected file
//       if (file) {
//         this.setState({ image: file });
//         this.saveImage(file); // Save the selected image to IndexedDB
//       }
//     };
  
//     componentDidMount() {
//       this.initDB(); // Initialize IndexedDB when the component mounts
//     }
setImage = (img: File) => {
  this.setState({image:img});
};
  handleProvinceChange = async(value:any) => {
    const { store } = this.props;
    store.selectedProvince = value;
  await  store.getDivisionsByProvinceId({id:value});
  };
  handleDivisionChange = async(value:any) => {
    const { store } = this.props;
    store.selectedProvince = value;
  await  store.getCityByDivisionId({id:value});
  };
  handleCityChange = async(value:any) => {
    const { store } = this.props;
    store.selectedProvince = value;
  await  store.getTehsilByCityId({id:value});
  };


  render() {
    // const { image, storedImage } = this.state;
    const { divisions,cities,tehsils,provinces,speciality,branches } = this.props;
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 8 },
    //     sm: { span: 8 },
    //     md: { span: 8 },
    //     lg: { span: 8 },
    //     xl: { span: 8 },
    //     xxl: { span: 8 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 16 },
    //     sm: { span: 16 },
    //     md: { span: 16 },
    //     lg: { span: 16 },
    //     xl: { span: 16 },
    //     xxl: { span: 16 },
    //   },
    // };

    const { visible, onCancel, onCreate } = this.props;
    const Doptions = divisions.map((x: GetDivisions) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const Coptions = cities.map((x: GetCities) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    }); const Poptions = provinces.map((x: GetProvinces) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    }); const Toptions = tehsils.map((x: GetTehsils) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    }); const Boptions = branches.map((x: GetBranches) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    }); const Soptions = speciality.map((x: GetSpecialities) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    }); 

    return (
      <Modal visible={visible} width={1000} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Lawyer'} destroyOnClose={true}>
        <Form ref={this.props.formRef} layout='vertical'>

                        <DisplayImage name='lawyerPhotoPath' image={this.state.image} setImage={this.setImage} 
                        // imageRef={imageRef}
                        />
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label={L('Lawyer Name')}   name={'lawyerName'} rules={rules.lawyerName}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={L('Mobile')}   name={'lawyerMobile'} rules={rules.lawyerMobile}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={L('Liscene No')}   name={'lawyerLiscene'} rules={rules.lawyerLiscene}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label={L('Adress')}   name={'lawyerAdress'} rules={rules.lawyerAdress}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={L('Notes')}   name={'lawyerNotes'} rules={rules.lawyerNotes}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={L('Practicing Bar')}   name={'lawyerPracticingBar'} rules={rules.lawyerPracticingBar }>
            <Input />
          </Form.Item>
        </Col>
      </Row>
          <Row gutter={16}>
            <Col span={6}>
          <Form.Item label={L('Province')}   name={'provinceId'} rules={rules.provinceId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Poptions}
              onChange={this.handleProvinceChange} 
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
            </Col>
            <Col span={6}>
          <Form.Item label={L('Division')}   name={'divisionId'} rules={rules.divisionId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Doptions}
              allowClear
              onChange={this.handleDivisionChange} 
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
            </Col>
            <Col span={6}>
          <Form.Item label={L('City')}   name={'cityId'} rules={rules.cityId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Coptions}
              allowClear
              onChange={this.handleCityChange} 
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
            </Col>
            <Col span={6}>
          <Form.Item label={L('Tehsil')}   name={'tehsilId'} rules={rules.tehsilId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Toptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
          <Form.Item label={L('Speaciality')}   name={'lawyerSpeacialityId'} rules={rules.lawyerSpeacialityId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Soptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
            </Col>
            <Col span={10}>
          <Form.Item label={L('Branch Name')}   name={'branchId'} rules={rules.branchId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Boptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
            </Col>
            <Col span={4}><Form.Item label={L('Is Active')}   name={'lawyerStatus'}valuePropName={'checked'} >
          <Checkbox style={{width:'100%'}}></Checkbox>
          </Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
          <Form.Item label={L('Lic Reg Date')}   name={'lawyerLicRegDate'}>
            <DatePicker style={{width:'100%'}}/>
          </Form.Item>
            </Col>
           
            <Col span={6}>
          <Form.Item label={L('Lic Exp Date')}   name={'lawyerLicExpDate'} >
            <DatePicker style={{width:'100%'}}/>
          </Form.Item>
            </Col>
            <Col span={6}>
          <Form.Item label={L('Reg Date')}   name={'lawyerFirmRegDate'} rules={rules.lawyerFirmRegDate}>
            <DatePicker style={{width:'100%'}}/>
          </Form.Item>
            </Col>
            <Col span={6}>
          <Form.Item label={L('Res Date')}   name={'lawyerResigDate'} rules={rules.lawyerResigDate}>
            <DatePicker style={{width:'100%'}}/>
          </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateLawyer;

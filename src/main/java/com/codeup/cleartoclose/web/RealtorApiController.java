//package com.codeup.cleartoclose.web;
//
//import org.apache.http.HttpEntity;
//import org.apache.http.HttpResponse;
//import org.apache.http.client.methods.HttpGet;
//import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.HttpClients;
//import org.apache.http.util.EntityUtils;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.io.IOException;
//import java.io.UnsupportedEncodingException;
//
//@CrossOrigin
//@RestController
//@RequestMapping(value = "/api/houseInfo", headers = "Accept=application/text")
//public class RealtorApiController {
//    @Value("${realtorAPIkey}")
//    private String realtorAPIkey;
//
//    @GetMapping
//    private ResponseEntity<String> getAll(@RequestParam String address) {
//        String encode = null;
//        try {
//           encode = java.net.URLEncoder.encode(address, "UTF-8").replace("+", "%20");
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        }
//        String result = "";
//        CloseableHttpClient httpclient = HttpClients.createDefault();
//        HttpGet request = new HttpGet("https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address="+encode);
//        request.addHeader("apikey", realtorAPIkey);
//        try {
//            HttpResponse response = httpclient.execute(request);
//            HttpEntity entity = response.getEntity();
//            result = EntityUtils.toString(entity);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        } finally {
//            try {
//                httpclient.close();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }
//}

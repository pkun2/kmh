package com.website.kmh.vo;
import lombok.Data;

@Data
public class EmailCodeVO {
    private String receiver;
    private String authCode;
}